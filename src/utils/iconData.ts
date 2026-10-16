import simpleIcons from '@iconify-json/simple-icons/icons.json';
import type { KeyIconData, Technology } from '@utils/data';

// Solo se usa en el servidor (frontmatter de Astro): el JSON completo no viaja al navegador
interface RawIcon {
  body: string;
  width?: number;
  height?: number;
}

interface IconSet {
  width?: number;
  height?: number;
  icons: Record<string, RawIcon>;
  aliases?: Record<string, { parent: string }>;
}

const iconSet = simpleIcons as unknown as IconSet;

function findIcon(iconName: string): RawIcon | undefined {
  const direct = iconSet.icons[iconName];
  if (direct) return direct;

  const parent = iconSet.aliases?.[iconName]?.parent;
  return parent ? iconSet.icons[parent] : undefined;
}

export function getKeyIcons(technologies: Technology[]): KeyIconData[] {
  const result: KeyIconData[] = [];

  for (const technology of technologies) {
    // formato de astro-icon: 'simple-icons:nombre'
    const iconName = technology.icon.split(':')[1];
    const icon = iconName ? findIcon(iconName) : undefined;

    if (!icon) continue;

    result.push({
      name: technology.name,
      body: icon.body,
      width: icon.width ?? iconSet.width ?? 24,
      height: icon.height ?? iconSet.height ?? 24,
    });
  }

  return result;
}