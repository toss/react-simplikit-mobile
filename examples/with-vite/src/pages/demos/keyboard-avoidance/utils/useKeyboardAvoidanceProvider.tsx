import type { CSSProperties, ReactNode } from 'react';
import React, { cloneElement, isValidElement, useEffect, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

// =============================================================================
// Types
// =============================================================================

export type KeyboardMetrics = {
  vvh: number; // visual viewport height
  vvt: number; // visual viewport offsetTop
  kbh: number; // estimated keyboard height
  isOpen: boolean;
};

export type KeyboardAvoidanceProviderProps = {
  children: ReactNode;
  injectStyles?: boolean;
  enableIOSComposerFocusFix?: boolean;
  preventIOSAutoZoom?: boolean;
  openThresholdPx?: number;
  smoothDocking?: boolean;
  smoothDurationMs?: number;
};

export type KeyboardComposerProps = {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  style?: CSSProperties;
  portal?: boolean;
};

// =============================================================================
// Constants
// =============================================================================

const DEFAULT_METRICS: KeyboardMetrics = { vvh: 0, vvt: 0, kbh: 0, isOpen: false };
const COMPOSER_ATTR = 'data-kb-composer';
const OVERLAY_ROOT_ID = 'kb-overlay-root';
const HTML_ANIM_CLASS = 'kb-anim';
const JITTER_EPS_PX = 0.5;
const GUARD_MAX_MS = 1100;

// =============================================================================
// Module State (Singleton)
// =============================================================================

let metrics: KeyboardMetrics = DEFAULT_METRICS;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function emit() {
  listeners.forEach(l => l());
}

function getSnapshot() {
  return metrics;
}

function getServerSnapshot() {
  return DEFAULT_METRICS;
}

// =============================================================================
// Utilities
// =============================================================================

function isServer() {
  return typeof window === 'undefined';
}

function isIOS() {
  const ua = navigator.userAgent;
  return /iP(hone|od|ad)/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
}

function quantizeToDevicePixel(n: number) {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(n * dpr) / dpr;
}

function deriveRawKbh(layoutH: number, vvh: number, vvt: number) {
  return Math.max(0, layoutH - vvh - vvt);
}

// =============================================================================
// CSS Variables
// =============================================================================

function applyCssVars(next: KeyboardMetrics, smoothDurationMs: number) {
  const root = document.documentElement;
  root.style.setProperty('--kb-vvh', `${next.vvh}px`);
  root.style.setProperty('--kb-vvt', `${next.vvt}px`);
  root.style.setProperty('--kb-kbh', `${next.kbh}px`);
  root.style.setProperty('--kb-anim-ms', `${smoothDurationMs}ms`);
}

// =============================================================================
// Stable Metrics Computation
// =============================================================================

function computeStableMetrics(openThresholdPx: number, prev: KeyboardMetrics): KeyboardMetrics {
  const layoutH = window.innerHeight;
  const vv = window.visualViewport;

  const vvhRaw = vv?.height ?? layoutH;
  const vvtRaw = vv?.offsetTop ?? 0;

  const vvhQ = quantizeToDevicePixel(vvhRaw);
  const vvtQ = quantizeToDevicePixel(vvtRaw);

  const rawKbh = deriveRawKbh(layoutH, vvhQ, vvtQ);
  const isOpenCandidate = rawKbh >= openThresholdPx && rawKbh > 0;

  if (!isOpenCandidate) {
    // Keyboard closed: fix to layout height to prevent rubber-band/toolbar jitter
    const vvh = quantizeToDevicePixel(layoutH);
    const vvt = 0;
    return { vvh, vvt, kbh: 0, isOpen: false };
  }

  // Keyboard open: follow visualViewport with jitter suppression
  const vvhStable = Math.abs(vvhQ - prev.vvh) < JITTER_EPS_PX ? prev.vvh : vvhQ;
  const vvtStable = Math.abs(vvtQ - prev.vvt) < JITTER_EPS_PX ? prev.vvt : vvtQ;

  const kbhRaw2 = deriveRawKbh(layoutH, vvhStable, vvtStable);
  const kbh = kbhRaw2 < openThresholdPx ? 0 : kbhRaw2;

  return { vvh: vvhStable, vvt: vvtStable, kbh, isOpen: kbh > 0 };
}

// =============================================================================
// Overlay Root
// =============================================================================

function ensureOverlayRoot(): HTMLElement {
  let root = document.getElementById(OVERLAY_ROOT_ID) as HTMLElement | null;
  if (root != null) {
    return root;
  }

  root = document.createElement('div');
  root.id = OVERLAY_ROOT_ID;
  document.documentElement.appendChild(root);
  return root;
}

// =============================================================================
// Base Styles Injection
// =============================================================================

function injectBaseStylesOnce(preventIOSAutoZoom: boolean) {
  const id = 'kb-avoidance-base-styles';
  if (document.getElementById(id) != null) {
    return;
  }

  const style = document.createElement('style');
  style.id = id;

  style.textContent = `
#${OVERLAY_ROOT_ID}{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  height: var(--kb-vvh, 100vh);
  transform: translate3d(0, var(--kb-vvt, 0px), 0);

  pointer-events: none;
  z-index: 2147483647;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  contain: layout paint;
  isolation: isolate;
}

html.${HTML_ANIM_CLASS} #${OVERLAY_ROOT_ID}{
  transition:
    transform var(--kb-anim-ms, 180ms) cubic-bezier(0.2, 0, 0, 1),
    height    var(--kb-anim-ms, 180ms) cubic-bezier(0.2, 0, 0, 1);
}

@media (prefers-reduced-motion: reduce){
  html.${HTML_ANIM_CLASS} #${OVERLAY_ROOT_ID}{
    transition: none;
  }
}

#${OVERLAY_ROOT_ID} [${COMPOSER_ATTR}]{
  pointer-events: auto;

  position: absolute;
  left: 0; right: 0;
  bottom: 0;

  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}

${
  preventIOSAutoZoom
    ? `
#${OVERLAY_ROOT_ID} [${COMPOSER_ATTR}] input,
#${OVERLAY_ROOT_ID} [${COMPOSER_ATTR}] textarea,
#${OVERLAY_ROOT_ID} [${COMPOSER_ATTR}] [contenteditable="true"]{
  font-size: 16px;
}`
    : ''
}
`;
  document.head.appendChild(style);
}

// =============================================================================
// iOS Composer Focus Fix
// =============================================================================

type FreezeState = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
  height: string;
};

function installIOSComposerFocusFix(openThresholdPx: number) {
  if (!isIOS()) {
    return () => {};
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const findEditableInComposer = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (el == null) {
      return null;
    }

    const composer = el.closest?.(`[${COMPOSER_ATTR}]`);
    if (composer == null) {
      return null;
    }

    const tag = el.tagName;
    const isEditableSelf = tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable === true;

    if (isEditableSelf) {
      return el;
    }

    const nested = el.closest?.("input,textarea,[contenteditable='true']");
    return nested as HTMLElement | null;
  };

  const focusNoScroll = (editable: HTMLElement) => {
    try {
      editable.focus?.({ preventScroll: true });
    } catch {
      editable.focus?.();
    }
  };

  const isWindowScrollable = () => {
    const se = document.scrollingElement || document.documentElement;
    return se.scrollHeight - se.clientHeight > 1;
  };

  // ---------------------------------------------------------------------------
  // Freeze State
  // ---------------------------------------------------------------------------

  let frozen = false;
  let frozenScrollY = 0;
  let prevHtml: FreezeState | null = null;
  let prevBody: FreezeState | null = null;

  const freezeRoot = () => {
    if (frozen) {
      return;
    }

    frozenScrollY = window.scrollY || 0;

    const html = document.documentElement;
    const body = document.body;

    prevHtml = {
      position: html.style.position,
      top: html.style.top,
      left: html.style.left,
      right: html.style.right,
      width: html.style.width,
      overflow: html.style.overflow,
      height: html.style.height,
    };
    prevBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      height: body.style.height,
    };

    html.style.position = 'fixed';
    html.style.top = `-${frozenScrollY}px`;
    html.style.left = '0';
    html.style.right = '0';
    html.style.width = '100%';
    html.style.height = '100%';
    html.style.overflow = 'hidden';

    body.style.position = 'fixed';
    body.style.top = `-${frozenScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.overflow = 'hidden';

    frozen = true;
  };

  const unfreezeRoot = () => {
    if (!frozen || prevHtml == null || prevBody == null) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    html.style.position = prevHtml.position;
    html.style.top = prevHtml.top;
    html.style.left = prevHtml.left;
    html.style.right = prevHtml.right;
    html.style.width = prevHtml.width;
    html.style.height = prevHtml.height;
    html.style.overflow = prevHtml.overflow;

    body.style.position = prevBody.position;
    body.style.top = prevBody.top;
    body.style.left = prevBody.left;
    body.style.right = prevBody.right;
    body.style.width = prevBody.width;
    body.style.height = prevBody.height;
    body.style.overflow = prevBody.overflow;

    window.scrollTo(0, frozenScrollY);

    frozen = false;
    prevHtml = null;
    prevBody = null;
  };

  // ---------------------------------------------------------------------------
  // Guard Scroll
  // ---------------------------------------------------------------------------

  const isKeyboardOpenNow = () => {
    const layoutH = window.innerHeight;
    const vv = window.visualViewport;
    if (vv == null) {
      return false;
    }

    const vvh = quantizeToDevicePixel(vv.height);
    const vvt = quantizeToDevicePixel(vv.offsetTop);

    const raw = deriveRawKbh(layoutH, vvh, vvt);
    return raw >= openThresholdPx && raw > 0;
  };

  let guardToken = 0;

  const guardScrollUntilKeyboardOpen = (anchorY: number, maxMs = GUARD_MAX_MS) => {
    const token = ++guardToken;
    const start = performance.now();

    const tick = () => {
      if (token !== guardToken) {
        return;
      }

      if (window.scrollY !== anchorY) {
        window.scrollTo(0, anchorY);
      }

      const opened = metrics.kbh >= openThresholdPx || isKeyboardOpenNow();
      const timedOut = performance.now() - start > maxMs;

      if (opened || timedOut) {
        return;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // ---------------------------------------------------------------------------
  // Event Handlers
  // ---------------------------------------------------------------------------

  let focusFreezeActive = false;

  const handleComposerIntent = (editable: HTMLElement, e?: Event) => {
    const scrollable = isWindowScrollable();

    // Only freeze on non-scrollable pages
    if (!scrollable) {
      freezeRoot();
      focusFreezeActive = true;
    }

    const y = window.scrollY || 0;

    // Prevent browser default focus/panning
    if (e && 'preventDefault' in e) {
      e.preventDefault?.();
    }

    focusNoScroll(editable);
    guardScrollUntilKeyboardOpen(y);
  };

  const onTouchStartCapture = (e: TouchEvent) => {
    const editable = findEditableInComposer(e.target);
    if (editable == null) {
      return;
    }
    if (document.activeElement === editable) {
      return;
    }
    handleComposerIntent(editable, e);
  };

  const onPointerDownCapture = (e: PointerEvent) => {
    if (e.pointerType && e.pointerType !== 'touch') {
      return;
    }
    const editable = findEditableInComposer(e.target);
    if (editable == null) {
      return;
    }
    if (document.activeElement === editable) {
      return;
    }
    handleComposerIntent(editable, e);
  };

  const onFocusInCapture = (e: FocusEvent) => {
    const t = e.target as HTMLElement | null;
    if (t == null) {
      return;
    }

    const editable = findEditableInComposer(t);
    if (editable == null) {
      return;
    }

    // Freeze on non-scrollable pages for programmatic focus
    if (!isWindowScrollable()) {
      freezeRoot();
      focusFreezeActive = true;
    }

    const y = window.scrollY || 0;
    guardScrollUntilKeyboardOpen(y);
  };

  const onFocusOutCapture = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement as HTMLElement | null;
      const stillInComposer = !!active?.closest?.(`[${COMPOSER_ATTR}]`);

      if (!stillInComposer) {
        guardToken++;
        if (focusFreezeActive) {
          focusFreezeActive = false;
          unfreezeRoot();
        }
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Subscribe
  // ---------------------------------------------------------------------------

  document.addEventListener('touchstart', onTouchStartCapture, { capture: true, passive: false });
  document.addEventListener('pointerdown', onPointerDownCapture, { capture: true });
  document.addEventListener('focusin', onFocusInCapture, true);
  document.addEventListener('focusout', onFocusOutCapture, true);

  return () => {
    guardToken++;
    focusFreezeActive = false;
    unfreezeRoot();

    document.removeEventListener('touchstart', onTouchStartCapture, true);
    document.removeEventListener('pointerdown', onPointerDownCapture, true);
    document.removeEventListener('focusin', onFocusInCapture, true);
    document.removeEventListener('focusout', onFocusOutCapture, true);
  };
}

// =============================================================================
// Global Lifecycle
// =============================================================================

let started = false;
let refCount = 0;
let teardown: (() => void) | null = null;

let prevIsOpen: boolean | null = null;
let animTimer: number | null = null;

function setAnimatingTemporarily(durationMs: number) {
  const html = document.documentElement;
  html.classList.add(HTML_ANIM_CLASS);

  if (animTimer != null) {
    window.clearTimeout(animTimer);
  }
  animTimer = window.setTimeout(
    () => {
      html.classList.remove(HTML_ANIM_CLASS);
      animTimer = null;
    },
    Math.max(0, durationMs) + 60
  );
}

type StartGlobalOptions = Required<
  Pick<
    KeyboardAvoidanceProviderProps,
    | 'injectStyles'
    | 'enableIOSComposerFocusFix'
    | 'preventIOSAutoZoom'
    | 'openThresholdPx'
    | 'smoothDocking'
    | 'smoothDurationMs'
  >
>;

function startGlobal(opts: StartGlobalOptions) {
  if (isServer()) {
    return () => {};
  }
  if (started) {
    return teardown ?? (() => {});
  }

  started = true;

  if (opts.injectStyles) {
    ensureOverlayRoot();
    injectBaseStylesOnce(opts.preventIOSAutoZoom);
  }

  let rafPending = false;

  const scheduleUpdate = () => {
    if (rafPending) {
      return;
    }
    rafPending = true;

    requestAnimationFrame(() => {
      rafPending = false;

      const next = computeStableMetrics(opts.openThresholdPx, metrics);

      if (opts.smoothDocking) {
        if (prevIsOpen === null) {
          prevIsOpen = next.isOpen;
        }
        if (prevIsOpen !== next.isOpen) {
          prevIsOpen = next.isOpen;
          setAnimatingTemporarily(opts.smoothDurationMs);
        }
      }

      metrics = next;
      applyCssVars(metrics, opts.smoothDurationMs);
      emit();
    });
  };

  scheduleUpdate();

  const vv = window.visualViewport;
  vv?.addEventListener('resize', scheduleUpdate);
  vv?.addEventListener('scroll', scheduleUpdate);

  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('orientationchange', scheduleUpdate);

  document.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });

  const removeFocusFix = opts.enableIOSComposerFocusFix ? installIOSComposerFocusFix(opts.openThresholdPx) : () => {};

  teardown = () => {
    vv?.removeEventListener('resize', scheduleUpdate);
    vv?.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    window.removeEventListener('orientationchange', scheduleUpdate);
    document.removeEventListener('scroll', scheduleUpdate, true);

    removeFocusFix();

    if (animTimer != null) {
      window.clearTimeout(animTimer);
    }
    animTimer = null;
    document.documentElement.classList.remove(HTML_ANIM_CLASS);
    prevIsOpen = null;

    started = false;
    teardown = null;
  };

  return teardown;
}

// =============================================================================
// Public API: useKeyboardMetrics
// =============================================================================

export function useKeyboardMetrics(): KeyboardMetrics {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// =============================================================================
// Public API: KeyboardAvoidanceProvider
// =============================================================================

export function KeyboardAvoidanceProvider({
  children,
  injectStyles = true,
  enableIOSComposerFocusFix = true,
  preventIOSAutoZoom = true,
  openThresholdPx = 80,
  smoothDocking = true,
  smoothDurationMs = 180,
}: KeyboardAvoidanceProviderProps) {
  useEffect(() => {
    if (isServer()) {
      return;
    }

    refCount += 1;
    if (refCount === 1) {
      teardown = startGlobal({
        injectStyles,
        enableIOSComposerFocusFix,
        preventIOSAutoZoom,
        openThresholdPx,
        smoothDocking,
        smoothDurationMs,
      });
    }

    return () => {
      refCount -= 1;
      if (refCount <= 0) {
        refCount = 0;
        teardown?.();
      }
    };
  }, [injectStyles, enableIOSComposerFocusFix, preventIOSAutoZoom, openThresholdPx, smoothDocking, smoothDurationMs]);

  return <>{children}</>;
}

// =============================================================================
// Public API: KeyboardComposer
// =============================================================================

export function KeyboardComposer({
  children,
  asChild = false,
  className,
  style,
  portal = true,
}: KeyboardComposerProps) {
  const shouldPortal = portal && !isServer();

  const props = useMemo(
    () => ({
      [COMPOSER_ATTR]: '',
      className,
      style,
    }),
    [className, style]
  );

  const content = useMemo(() => {
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<Record<string, unknown>>;
      return cloneElement(child, {
        ...child.props,
        ...props,
        className: [child.props.className, className].filter(Boolean).join(' '),
        style: { ...(child.props.style as CSSProperties), ...style },
        [COMPOSER_ATTR]: '',
      });
    }
    return <div {...props}>{children}</div>;
  }, [asChild, children, props, className, style]);

  const mountNode = useMemo(() => {
    if (!shouldPortal) {
      return null;
    }
    const el = document.createElement('div');
    el.style.pointerEvents = 'none';
    return el;
  }, [shouldPortal]);

  useEffect(() => {
    if (!shouldPortal || mountNode == null) {
      return;
    }
    const root = ensureOverlayRoot();
    root.appendChild(mountNode);
    return () => {
      root.removeChild(mountNode);
    };
  }, [shouldPortal, mountNode]);

  if (!shouldPortal || mountNode == null) {
    return content;
  }
  return createPortal(content, mountNode);
}
