import { KeyboardMetrics } from '../types/KeyboardMetrics.ts';

export const DEFAULT_METRICS: KeyboardMetrics = { vvh: 0, vvt: 0, kbh: 0, isOpen: false };

export const HTML_ANIM_CLASS = 'kb-anim';

// Reduce jitter (higher value = more stable positioning)
export const JITTER_EPS_PX = 0.5;

// Keyboard open detection + iOS animation/delay compensation
export const GUARD_MAX_MS = 1100;
export const OVERLAY_ROOT_ID = 'kb-overlay-root';
export const COMPOSER_ATTR = 'data-kb-composer';
