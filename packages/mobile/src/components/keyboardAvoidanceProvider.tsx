import React, { useEffect } from 'react';

import {
  COMPOSER_ATTR,
  DEFAULT_METRICS,
  GUARD_MAX_MS,
  HTML_ANIM_CLASS,
  JITTER_EPS_PX,
  OVERLAY_ROOT_ID,
} from '../constants/keyboard.ts';
import { KeyboardMetrics } from '../types/KeyboardMetrics.ts';
import { disableBodyScrollLock, enableBodyScrollLock } from '../utils/bodyScrollLock.ts';
import { createExternalStore } from '../utils/createExternalStore.ts';
import { isIOS } from '../utils/device/device.ts';
import { isServer } from '../utils/isServer.ts';
import { ensureOverlayRoot } from '../utils/overlay/ensureOverlayRoot.ts';

export type KeyboardAvoidanceProviderProps = {
  children: React.ReactNode;

  injectStyles?: boolean;
  enableIOSComposerFocusFix?: boolean;
  preventIOSAutoZoom?: boolean;

  openThresholdPx?: number;

  smoothDocking?: boolean;
  smoothDurationMs?: number;
};

const metricsStore = createExternalStore<KeyboardMetrics>(DEFAULT_METRICS);

/** quantize to device pixel */
function quantizeToDevicePixel(n: number) {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(n * dpr) / dpr;
}

function deriveRawKbh(layoutHeight: number, vvh: number, vvt: number) {
  return Math.max(0, layoutHeight - vvh - vvt);
}

function applyCssVars(next: KeyboardMetrics, smoothDurationMs: number) {
  const root = document.documentElement;
  root.style.setProperty('--kb-vvh', `${next.vvh}px`);
  root.style.setProperty('--kb-vvt', `${next.vvt}px`);
  root.style.setProperty('--kb-kbh', `${next.kbh}px`);
  root.style.setProperty('--kb-anim-ms', `${smoothDurationMs}ms`);
}

/**
 * Important: When the keyboard is closed (kbh=0), do NOT sync vvt/vvh with visualViewport.
 * Instead, fix them as:
 * - vvt = 0
 * - vvh = innerHeight
 * This prevents ChatInput from shifting due to iOS rubber-band or toolbar micro-panning.
 *
 * Only use visualViewport values when the keyboard is open.
 */
function computeStableMetrics(openThresholdPixel: number, prev: KeyboardMetrics): KeyboardMetrics {
  const layoutHeight = window.innerHeight;
  const visualViewport = window.visualViewport;

  const vvhRaw = visualViewport?.height ?? layoutHeight;
  const vvtRaw = visualViewport?.offsetTop ?? 0;

  const quantizedVvh = quantizeToDevicePixel(vvhRaw);
  const quantizedVvt = quantizeToDevicePixel(vvtRaw);

  const rawKeyboardHeight = deriveRawKbh(layoutHeight, quantizedVvh, quantizedVvt);
  const isOpenCandidate = rawKeyboardHeight >= openThresholdPixel && rawKeyboardHeight > 0;

  if (!isOpenCandidate) {
    // When the keyboard is closed, fix vvt/vvh to layout height to prevent bouncing/toolbar micro-panning.
    const vvh = quantizeToDevicePixel(layoutHeight);
    const vvt = 0;
    return { vvh, vvt, kbh: 0, isOpen: false };
  }

  // When the keyboard is open, follow visualViewport but suppress sub-pixel jitter with JITTER_EPS_PX.
  const stableVvh = Math.abs(quantizedVvh - prev.vvh) < JITTER_EPS_PX ? prev.vvh : quantizedVvh;
  const stableVvt = Math.abs(quantizedVvt - prev.vvt) < JITTER_EPS_PX ? prev.vvt : quantizedVvt;

  const stableKeyboardHeight = deriveRawKbh(layoutHeight, stableVvh, stableVvt);
  const kbh = stableKeyboardHeight < openThresholdPixel ? 0 : stableKeyboardHeight;

  return { vvh: stableVvh, vvt: stableVvt, kbh: stableKeyboardHeight, isOpen: kbh > 0 };
}

function injectBaseStylesOnce(preventIOSAutoZoom: boolean) {
  const id = 'kb-avoidance-base-styles';
  if (document.getElementById(id)) return;

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

  padding-bottom: env(safe-area-inset-bottom);

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

/**
 * iOS composer focus fix:
 * - Intercept the browser's default focus + auto-scroll (panning)
 * - Manually call focus({ preventScroll: true }) to give focus
 * - On non-scrollable pages, freeze html+body during focus to further suppress viewport panning
 */
function installIOSComposerFocusFix(openThresholdPx: number) {
  if (!isIOS()) return () => {};

  const findEditableInComposer = (target: EventTarget | null) => {
    const element = target as HTMLElement | null;
    if (!element) return null;

    const composer = element.closest?.(`[${COMPOSER_ATTR}]`);
    if (!composer) return null;

    const tag = element.tagName;
    const isEditableSelf = tag === 'INPUT' || tag === 'TEXTAREA' || element.isContentEditable === true;

    if (isEditableSelf) return element;

    const nested = element.closest?.("input,textarea,[contenteditable='true']");
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

  // ---- freeze body scroll (maintained during focus) ----
  let frozen = false;

  const freezeRoot = () => {
    if (frozen) return;
    enableBodyScrollLock();
    frozen = true;
  };

  const unfreezeRoot = () => {
    if (!frozen) return;
    disableBodyScrollLock();
    frozen = false;
  };

  // ---- scrollY guard until keyboard open (secondary guard) ----
  const isKeyboardOpenNow = () => {
    const layoutH = window.innerHeight;
    const vv = window.visualViewport;
    if (!vv) return false;

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
      if (token !== guardToken) return;

      if (window.scrollY !== anchorY) window.scrollTo(0, anchorY);

      const opened = metricsStore.getState().kbh >= openThresholdPx || isKeyboardOpenNow();
      const timedOut = performance.now() - start > maxMs;

      if (opened || timedOut) return;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  let focusFreezeActive = false;

  const handleComposerIntent = (editable: HTMLElement, e?: Event) => {
    const scrollable = isWindowScrollable();

    // Only freeze during focus on non-scrollable pages
    if (!scrollable) {
      freezeRoot();
      focusFreezeActive = true;
    }

    const y = window.scrollY || 0;

    // Block browser default focus/panning
    if (e && 'preventDefault' in e) e.preventDefault?.();

    focusNoScroll(editable);

    // Secondary guard (safely scroll until keyboard open)
    guardScrollUntilKeyboardOpen(y);
  };

  const onTouchStartCapture = (e: TouchEvent) => {
    const editable = findEditableInComposer(e.target);
    if (!editable) return;
    if (document.activeElement === editable) return;
    handleComposerIntent(editable, e);
  };

  const onPointerDownCapture = (e: PointerEvent) => {
    if (e.pointerType && e.pointerType !== 'touch') return;
    const editable = findEditableInComposer(e.target);
    if (!editable) return;
    if (document.activeElement === editable) return;
    handleComposerIntent(editable, e);
  };

  // Handle programmatic focus (e.g. autofocus)
  const onFocusInCapture = (e: FocusEvent) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;

    const editable = findEditableInComposer(t);
    if (!editable) return;

    // Freeze on non-scrollable pages even for focus without touch
    if (!isWindowScrollable()) {
      freezeRoot();
      focusFreezeActive = true;
    }

    const y = window.scrollY || 0;
    guardScrollUntilKeyboardOpen(y);
  };

  // Unfreeze when focus leaves the composer
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

// --- global lifecycle ---
let started = false;
let refCount = 0;
let teardown: null | (() => void) = null;

// smooth docking control
let prevIsOpen: boolean | null = null;
let animTimer: number | null = null;

function setAnimatingTemporarily(durationMs: number) {
  const html = document.documentElement;
  html.classList.add(HTML_ANIM_CLASS);

  if (animTimer != null) window.clearTimeout(animTimer);
  animTimer = window.setTimeout(
    () => {
      html.classList.remove(HTML_ANIM_CLASS);
      animTimer = null;
    },
    Math.max(0, durationMs) + 60
  );
}

function startGlobal(
  opts: Required<
    Pick<
      KeyboardAvoidanceProviderProps,
      | 'injectStyles'
      | 'enableIOSComposerFocusFix'
      | 'preventIOSAutoZoom'
      | 'openThresholdPx'
      | 'smoothDocking'
      | 'smoothDurationMs'
    >
  >
) {
  if (isServer()) return () => {};
  if (started) return teardown ?? (() => {});

  started = true;

  if (opts.injectStyles) {
    ensureOverlayRoot();
    injectBaseStylesOnce(opts.preventIOSAutoZoom);
  }

  let rafPending = false;
  const scheduleUpdate = () => {
    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      rafPending = false;

      const prev = metricsStore.getState();
      const next = computeStableMetrics(opts.openThresholdPx, prev);

      if (opts.smoothDocking) {
        if (prevIsOpen === null) prevIsOpen = next.isOpen;
        if (prevIsOpen !== next.isOpen) {
          prevIsOpen = next.isOpen;
          setAnimatingTemporarily(opts.smoothDurationMs);
        }
      }

      applyCssVars(next, opts.smoothDurationMs);
      metricsStore.setState(next);
    });
  };

  scheduleUpdate();

  const vv = window.visualViewport;
  vv?.addEventListener('resize', scheduleUpdate);
  vv?.addEventListener('scroll', scheduleUpdate);

  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('orientationchange', scheduleUpdate);

  // Trigger updates including inner scroll containers
  document.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });

  const removeFocusFix = opts.enableIOSComposerFocusFix ? installIOSComposerFocusFix(opts.openThresholdPx) : () => {};

  teardown = () => {
    vv?.removeEventListener('resize', scheduleUpdate);
    vv?.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    window.removeEventListener('orientationchange', scheduleUpdate);
    document.removeEventListener('scroll', scheduleUpdate, true);

    removeFocusFix();

    if (animTimer != null) window.clearTimeout(animTimer);
    animTimer = null;
    document.documentElement.classList.remove(HTML_ANIM_CLASS);
    prevIsOpen = null;

    started = false;
    teardown = null;
  };

  return teardown;
}

// --- Public API ---
export function useKeyboardMetrics(): KeyboardMetrics {
  return metricsStore.useStore();
}

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
    if (isServer()) return;

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
