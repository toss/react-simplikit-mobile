import glob from 'fast-glob';
import path from 'node:path';
import { DefaultTheme } from 'vitepress';

export function getSidebarItems(
  docsRoot: string,
  packageName: 'core' | 'mobile',
  ...parts: string[]
): DefaultTheme.SidebarItem[] {
  const files = glob.sync(path.join(docsRoot, ...parts, '*.md'));
  const locale = /^[a-z]{2}$/.test(parts[parts.length - 1]) ? parts.pop()! : '';

  return files.map(file => {
    const filename = path.basename(file, '.md');

    // For core package: /core/hooks/useBooleanState or /ko/core/hooks/useBooleanState
    // For mobile package: /mobile/hooks/useAvoidKeyboard or /ko/mobile/hooks/useAvoidKeyboard
    const category = parts[0]; // 'hooks', 'components', 'utils'
    const basePath = locale === ''
      ? `/${packageName}/${category}/${filename}`
      : `/${locale}/${packageName}/${category}/${filename}`;

    return { text: filename, link: basePath };
  });
}
