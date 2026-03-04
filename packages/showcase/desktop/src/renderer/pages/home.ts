import { el, section } from '../utils/dom';

export function renderHomePage(container: HTMLElement) {
  container.appendChild(el('h1', { className: 'page-title' }, 'DT Design System'));
  container.appendChild(el('p', { className: 'page-subtitle' }, 'Web CSS component showcase — switch brands and modes in the sidebar.'));

  const categories = [
    { hash: 'bevels', title: 'Bevels', desc: 'Angular clip-path patterns — cards, buttons, badges, media frames, modals, drawers' },
    { hash: 'glows', title: 'Glows', desc: 'Neon drop-shadow and text-shadow effects for the DT brand' },
    { hash: 'forms', title: 'Forms', desc: 'Text inputs, checkboxes, switches, radios, progress bars, accordions, steppers' },
    { hash: 'tokens', title: 'Tokens', desc: 'Color palette, typography, spacing, and shape values for the active brand' },
  ];

  for (const cat of categories) {
    const link = el('a', { href: `#/${cat.hash}`, className: 'home-card-link' });
    const card = el('div', { className: 'card' });
    card.appendChild(el('div', { className: 'card-title' }, cat.title.toUpperCase()));
    card.appendChild(el('div', { className: 'card-body' }, cat.desc));
    link.appendChild(card);
    container.appendChild(link);
  }

  // Quick overview terminal
  container.appendChild(
    section('Quick Start', 'Include the CSS and set data attributes on your HTML element.',
      el('div', { className: 'terminal dt-accent-top' },
        el('code', {},
          '<link rel="stylesheet" href="@dangerousthings/web">\n<html data-brand="dt" data-theme="dark">'
        ),
      ),
    ),
  );
}
