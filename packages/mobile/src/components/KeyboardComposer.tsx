import React, { cloneElement, isValidElement, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { COMPOSER_ATTR } from '../constants/keyboard.ts';
import { isServer } from '../utils/isServer.ts';
import { ensureOverlayRoot } from '../utils/overlay/ensureOverlayRoot.ts';

export type KeyboardComposerProps = {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: React.CSSProperties;
  portal?: boolean;
};

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
      const child = children as React.ReactElement<any>;
      return cloneElement(child, {
        ...child.props,
        ...props,
        className: [child.props.className, className].filter(Boolean).join(' '),
        style: { ...child.props.style, ...style },
        [COMPOSER_ATTR]: '',
      });
    }
    return <div {...(props as any)}>{children}</div>;
  }, [asChild, children, props, className, style]);

  const mountNode = useMemo(() => {
    if (!shouldPortal) return null;
    const el = document.createElement('div');
    el.style.pointerEvents = 'none';
    return el;
  }, [shouldPortal]);

  useEffect(() => {
    if (!shouldPortal || !mountNode) return;
    const root = ensureOverlayRoot();
    root.appendChild(mountNode);
    return () => {
      root.removeChild(mountNode);
    };
  }, [shouldPortal, mountNode]);

  if (!shouldPortal || !mountNode) return content as any;
  return createPortal(content, mountNode);
}
