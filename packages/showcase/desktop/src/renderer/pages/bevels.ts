import { el, section, row, label, codeLabel } from '../utils/dom';

export function renderBevelsPage(container: HTMLElement) {
  container.appendChild(el('h1', { className: 'page-title' }, 'Bevels'));
  container.appendChild(el('p', { className: 'page-subtitle' }, 'Angular clip-path patterns from the DT design system. Active on the DT brand.'));

  // Card Bevels
  const card1 = el('div', { className: 'card', style: 'padding: var(--space-6);' });
  card1.appendChild(el('div', { className: 'card-title' }, 'CARD TITLE'));
  card1.appendChild(el('div', { className: 'card-body' }, 'Dual bottom bevels — bottom-right (bevel-md) and bottom-left (bevel-sm). Uses the dual-element technique with ::before pseudo-element.'));
  const card2 = el('div', { className: 'card', style: 'padding: var(--space-6);' });
  card2.appendChild(el('div', { className: 'card-body' }, 'Card without title — no header bar, just the beveled container.'));

  container.appendChild(
    section('Card Bevels', 'Dual bottom bevels using clip-path. Outer bg = border color, ::before = surface fill.',
      card1,
      codeLabel('.card or .dt-bevel-card'),
      card2,
      codeLabel('.card (no .card-title child)'),
    ),
  );

  // Button Bevels
  container.appendChild(
    section('Button Bevels', 'Top-right corner cut. Filled buttons use direct clip-path, outline uses dual-element.',
      row(
        el('button', { className: 'btn-primary' }, 'PRIMARY'),
        el('button', { className: 'btn-secondary' }, 'SECONDARY'),
        el('button', { className: 'btn-danger' }, 'DANGER'),
      ),
      codeLabel('.btn-primary | .btn-secondary | .btn-danger'),
    ),
  );

  // Badge Bevels
  container.appendChild(
    section('Badge Bevels', 'Top-right bevel with dual-element technique. Color variants via CSS custom properties.',
      row(
        el('span', { className: 'badge' }, 'Default'),
        el('span', { className: 'badge badge-success' }, 'Success'),
        el('span', { className: 'badge badge-error' }, 'Error'),
        el('span', { className: 'badge badge-warning' }, 'Warning'),
        el('span', { className: 'badge badge-info' }, 'Info'),
      ),
      codeLabel('.badge | .badge-success | .badge-error | .badge-warning | .badge-info'),
    ),
  );

  // Media Frame
  const mediaFrame = el('div', {
    className: 'dt-bevel-media',
    style: 'background: var(--color-primary); width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;',
  });
  mediaFrame.appendChild(el('span', { style: 'color: var(--color-bg); font-weight: 700;' }, 'MEDIA FRAME'));

  container.appendChild(
    section('Media Frame Bevels', 'Diagonal opposite corners (top-left + bottom-right).',
      mediaFrame,
      codeLabel('.dt-bevel-media'),
    ),
  );

  // Modal Bevel
  const modalDemo = el('div', {
    className: 'dt-bevel-modal',
    style: 'background: var(--color-primary); padding: var(--space-8); text-align: center;',
  });
  const modalInner = el('div', { style: 'background: var(--color-surface); padding: var(--space-6);' });
  modalInner.appendChild(el('div', { style: 'font-weight: 700; text-transform: uppercase;' }, 'Modal Content'));
  modalInner.appendChild(el('div', { style: 'color: var(--color-text-muted); margin-top: var(--space-2);' }, 'Large dual bottom bevels'));
  modalDemo.appendChild(modalInner);

  container.appendChild(
    section('Modal Bevels', 'Dual bottom bevels at bevel-lg scale.',
      modalDemo,
      codeLabel('.dt-bevel-modal'),
    ),
  );

  // Drawer Bevels
  const drawerRight = el('div', {
    className: 'dt-bevel-drawer-right',
    style: 'background: var(--color-primary); padding: var(--space-6); width: 200px; height: 120px; display: flex; align-items: center; justify-content: center;',
  });
  drawerRight.appendChild(el('span', { style: 'color: var(--color-bg); font-weight: 700;' }, 'RIGHT'));
  const drawerLeft = el('div', {
    className: 'dt-bevel-drawer-left',
    style: 'background: var(--color-primary); padding: var(--space-6); width: 200px; height: 120px; display: flex; align-items: center; justify-content: center;',
  });
  drawerLeft.appendChild(el('span', { style: 'color: var(--color-bg); font-weight: 700;' }, 'LEFT'));

  container.appendChild(
    section('Drawer Bevels', 'Exposed-edge bevels for sliding panels.',
      row(drawerRight, drawerLeft),
      codeLabel('.dt-bevel-drawer-right | .dt-bevel-drawer-left'),
    ),
  );

  // Small Bevel Utility
  const smallBevel = el('div', {
    className: 'dt-bevel-sm',
    style: 'background: var(--color-primary); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;',
  });
  smallBevel.appendChild(el('span', { style: 'color: var(--color-bg); font-weight: 700; font-size: 0.75rem;' }, 'SM'));

  container.appendChild(
    section('Small Bevel Utility', 'For compact elements — arrows, stepper buttons.',
      row(smallBevel),
      codeLabel('.dt-bevel-sm'),
    ),
  );

  // Accent Top
  const accentDemo = el('div', {
    className: 'dt-accent-top',
    style: 'padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);',
  });
  accentDemo.appendChild(el('span', { style: 'font-weight: 600; text-transform: uppercase;' }, 'Thick Top Border Accent'));

  container.appendChild(
    section('Accent Top', 'Used on accordion headers and menu items.',
      accentDemo,
      codeLabel('.dt-accent-top'),
    ),
  );
}
