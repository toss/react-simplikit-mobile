import { OVERLAY_ROOT_ID } from '../../constants/keyboard.ts';

export function ensureOverlayRoot(): HTMLElement {
  let root = document.getElementById(OVERLAY_ROOT_ID) as HTMLElement | null;
  if (root) return root;

  root = document.createElement('div');
  root.id = OVERLAY_ROOT_ID;
  document.documentElement.appendChild(root);
  return root;
}
