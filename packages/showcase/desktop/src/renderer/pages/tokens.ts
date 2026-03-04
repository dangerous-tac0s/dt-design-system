import { brands } from '@dangerousthings/tokens';
import type { ThemeBrand } from '@dangerousthings/tokens';
import { el, section, codeLabel } from '../utils/dom';
import { getCurrentBrand } from '../brand-switcher';

export function renderTokensPage(container: HTMLElement) {
  container.appendChild(el('h1', { className: 'page-title' }, 'Tokens'));
  container.appendChild(el('p', { className: 'page-subtitle' }, 'Design token values for the active brand. Switch brands in the sidebar.'));

  const brandId = getCurrentBrand();
  const brand = brands[brandId];

  if (!brand) return;

  // Color Palette — Dark Mode
  const darkColors = brand.dark;
  const colorEntries: [string, string][] = Object.entries(darkColors);

  const colorsGrid = el('div', { style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-3);' });

  for (const [name, hex] of colorEntries) {
    const swatch = el('div', { style: 'display: flex; align-items: center; gap: var(--space-3);' });
    const colorBox = el('div', { style: `width: 32px; height: 32px; background: ${hex}; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;` });
    const info = el('div');
    info.appendChild(el('div', { style: 'font-weight: 600; font-size: 0.8125rem;' }, name));
    info.appendChild(el('div', { style: 'font-family: var(--font-mono); font-size: 0.6875rem; opacity: 0.5;' }, hex));
    swatch.appendChild(colorBox);
    swatch.appendChild(info);
    colorsGrid.appendChild(swatch);
  }

  container.appendChild(
    section(`Color Palette — ${brand.name} (Dark Mode)`, brand.description,
      colorsGrid,
    ),
  );

  // Light Mode
  const lightColors = brand.light;
  const lightEntries: [string, string][] = Object.entries(lightColors);

  const lightGrid = el('div', { style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-3);' });

  for (const [name, hex] of lightEntries) {
    const swatch = el('div', { style: 'display: flex; align-items: center; gap: var(--space-3);' });
    const colorBox = el('div', { style: `width: 32px; height: 32px; background: ${hex}; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;` });
    const info = el('div');
    info.appendChild(el('div', { style: 'font-weight: 600; font-size: 0.8125rem;' }, name));
    info.appendChild(el('div', { style: 'font-family: var(--font-mono); font-size: 0.6875rem; opacity: 0.5;' }, hex));
    swatch.appendChild(colorBox);
    swatch.appendChild(info);
    lightGrid.appendChild(swatch);
  }

  container.appendChild(
    section(`Color Palette — ${brand.name} (Light Mode)`, 'Light mode color tokens.',
      lightGrid,
    ),
  );

  // Typography
  const typo = el('div', { className: 'terminal', style: 'margin-bottom: var(--space-4);' });
  typo.appendChild(el('code', {},
    `heading: ${brand.typography.heading}\nbody:    ${brand.typography.body}\nmono:    ${brand.typography.mono}`
  ));

  container.appendChild(
    section('Typography', 'Font family tokens for headings, body text, and monospace.',
      typo,
    ),
  );

  // Typography Scale Demo
  const scaleItems = [
    { tag: 'h1', label: 'Heading 1', style: 'font-family: var(--font-heading); font-size: 2rem; font-weight: 900;' },
    { tag: 'h2', label: 'Heading 2', style: 'font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700;' },
    { tag: 'h3', label: 'Heading 3', style: 'font-family: var(--font-heading); font-size: 1.25rem; font-weight: 600;' },
    { tag: 'p', label: 'Body text — the quick brown fox jumps over the lazy dog', style: 'font-family: var(--font-body); font-size: 1rem;' },
    { tag: 'code', label: 'const monospace = "code";', style: 'font-family: var(--font-mono); font-size: 0.875rem;' },
  ];

  const scaleDemo = el('div', { style: 'display: flex; flex-direction: column; gap: var(--space-3);' });
  for (const item of scaleItems) {
    scaleDemo.appendChild(el(item.tag, { style: item.style }, item.label));
  }

  container.appendChild(
    section('Typography Scale', 'Live rendering with the current brand\'s font families.',
      scaleDemo,
    ),
  );

  // Shape Tokens
  const shape = el('div', { className: 'terminal', style: 'margin-bottom: var(--space-4);' });
  shape.appendChild(el('code', {},
    `bevelSm:  ${brand.shape.bevelSm}\nbevelMd:  ${brand.shape.bevelMd}\nbevelLg:  ${brand.shape.bevelLg}\nradiusSm: ${brand.shape.radiusSm}\nradius:   ${brand.shape.radius}\nradiusLg: ${brand.shape.radiusLg}`
  ));

  container.appendChild(
    section('Shape Tokens', 'Bevel and radius values determine the visual language — angular (DT) vs rounded (Classic).',
      shape,
    ),
  );

  // Spacing Scale
  const spacings = [
    { name: '--space-1', value: '0.25rem (4px)' },
    { name: '--space-2', value: '0.5rem (8px)' },
    { name: '--space-3', value: '0.75rem (12px)' },
    { name: '--space-4', value: '1rem (16px)' },
    { name: '--space-6', value: '1.5rem (24px)' },
    { name: '--space-8', value: '2rem (32px)' },
  ];

  const spacingDemo = el('div', { style: 'display: flex; flex-direction: column; gap: var(--space-2);' });
  for (const sp of spacings) {
    const row = el('div', { style: 'display: flex; align-items: center; gap: var(--space-3);' });
    row.appendChild(el('div', { style: `width: ${sp.name.replace('--', 'var(--') + ')'}; width: calc(${sp.value.split(' ')[0]} * 6); height: 12px; background: var(--color-primary); opacity: 0.6;` }));
    row.appendChild(el('span', { style: 'font-family: var(--font-mono); font-size: 0.75rem; opacity: 0.6;' }, `${sp.name}: ${sp.value}`));
    spacingDemo.appendChild(row);
  }

  container.appendChild(
    section('Spacing Scale', 'Shared spacing tokens across all brands.',
      spacingDemo,
    ),
  );

  // CSS Custom Properties reference
  const cssRef = el('div', { className: 'terminal' });
  cssRef.appendChild(el('code', {},
    `/* Generated CSS custom properties */\n--color-bg: ${darkColors.bg};\n--color-primary: ${darkColors.primary};\n--color-secondary: ${darkColors.secondary};\n--color-error: ${darkColors.error};\n--color-success: ${darkColors.success};\n--bevel-sm: ${brand.shape.bevelSm};\n--bevel-md: ${brand.shape.bevelMd};\n--font-heading: ${brand.typography.heading};`
  ));

  container.appendChild(
    section('CSS Custom Properties', 'These are generated from TypeScript tokens and applied per-brand via data-brand attribute.',
      cssRef,
      codeLabel('See packages/tokens/src/scripts/generate-css.ts'),
    ),
  );
}
