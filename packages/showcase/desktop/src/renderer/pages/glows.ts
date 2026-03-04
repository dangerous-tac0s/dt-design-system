import { el, section, row, codeLabel } from '../utils/dom';

export function renderGlowsPage(container: HTMLElement) {
  container.appendChild(el('h1', { className: 'page-title' }, 'Glows'));
  container.appendChild(el('p', { className: 'page-subtitle' }, 'Neon drop-shadow and text-shadow effects. Active on the DT brand.'));

  // Button Glows
  container.appendChild(
    section('Button Glows', 'filter: drop-shadow() follows clip-path shape. Hover for enhanced glow.',
      row(
        el('button', { className: 'btn-primary' }, 'PRIMARY GLOW'),
        el('button', { className: 'btn-danger' }, 'DANGER GLOW'),
      ),
      codeLabel('.btn-primary / .btn-danger — automatic on [data-brand="dt"]'),
      el('br'),
      row(
        el('button', { className: 'btn-secondary' }, 'SECONDARY (HOVER)'),
      ),
      codeLabel('.btn-secondary — glow on hover'),
    ),
  );

  // Link Glow
  const link = el('a', { href: '#', style: 'color: var(--color-primary); font-weight: 600; font-size: 1.125rem;' }, 'Hover this link for text glow');

  container.appendChild(
    section('Link Glow', 'text-shadow on hover for anchor elements.',
      row(link),
      codeLabel('a:hover — automatic on [data-brand="dt"]'),
    ),
  );

  // Terminal Inset
  const terminal = el('div', { className: 'terminal dt-accent-top' });
  terminal.appendChild(el('code', {}, '$ dt-web-theme --install\n> Installing design tokens...\n> Applying cyberpunk aesthetic...\n> Done. Welcome to the future.'));

  container.appendChild(
    section('Terminal Inset Glow', 'Inset + outer box-shadow. No clip-path so box-shadow works directly.',
      terminal,
      codeLabel('.terminal — automatic on [data-brand="dt"]'),
    ),
  );

  // Card Hover Glow
  const card = el('div', { className: 'card', style: 'padding: var(--space-6); cursor: pointer;' });
  card.appendChild(el('div', { className: 'card-title' }, 'HOVER ME'));
  card.appendChild(el('div', { className: 'card-body' }, 'Cards get a drop-shadow glow on hover.'));

  container.appendChild(
    section('Card Hover Glow', 'filter: drop-shadow() respects the beveled clip-path.',
      card,
      codeLabel('.card:hover — automatic on [data-brand="dt"]'),
    ),
  );

  // Input Focus Glow
  const input = el('input', {
    type: 'text',
    className: 'input',
    placeholder: 'Click to focus — see the glow bar',
    style: 'max-width: 400px;',
  }) as HTMLInputElement;

  container.appendChild(
    section('Input Focus Glow', 'box-shadow: 0 4px 0 1px — bright bar beneath the input.',
      input,
      codeLabel('.input:focus — automatic on [data-brand="dt"]'),
    ),
  );

  // Generic Glow Utilities
  const glowBox = el('div', {
    className: 'dt-glow',
    style: 'background: var(--color-primary); padding: var(--space-4) var(--space-6); display: inline-block; font-weight: 700; color: var(--color-bg);',
  }, '.dt-glow');
  const glowStrong = el('div', {
    className: 'dt-glow-strong',
    style: 'background: var(--color-primary); padding: var(--space-4) var(--space-6); display: inline-block; font-weight: 700; color: var(--color-bg);',
  }, '.dt-glow-strong');
  const glowInset = el('div', {
    className: 'dt-glow-inset',
    style: 'padding: var(--space-4) var(--space-6); display: inline-block; font-weight: 700; border: 1px solid var(--color-border);',
  }, '.dt-glow-inset');
  const textGlow = el('div', {
    className: 'dt-text-glow',
    style: 'font-size: 1.25rem; font-weight: 700; color: var(--color-primary); display: inline-block;',
  }, '.dt-text-glow');

  container.appendChild(
    section('Glow Utilities', 'Generic utility classes for applying glow effects to any element.',
      row(glowBox, glowStrong),
      codeLabel('.dt-glow | .dt-glow-strong'),
      row(glowInset, textGlow),
      codeLabel('.dt-glow-inset | .dt-text-glow'),
    ),
  );
}
