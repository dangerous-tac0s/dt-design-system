import '@dangerousthings/web/index.css';
import './style.css';

import { initRouter } from './utils/router';
import { initBrandSwitcher } from './brand-switcher';
import { renderHomePage } from './pages/home';
import { renderBevelsPage } from './pages/bevels';
import { renderGlowsPage } from './pages/glows';
import { renderFormsPage } from './pages/forms';
import { renderTokensPage } from './pages/tokens';

const routes: Record<string, (container: HTMLElement) => void> = {
  '': renderHomePage,
  'bevels': renderBevelsPage,
  'glows': renderGlowsPage,
  'forms': renderFormsPage,
  'tokens': renderTokensPage,
};

const sidebar = document.getElementById('sidebar')!;
const content = document.getElementById('content')!;

// Build sidebar navigation
const navTitle = document.createElement('div');
navTitle.className = 'nav-title';
navTitle.textContent = 'DT DESIGN SYSTEM';
sidebar.appendChild(navTitle);

const brandContainer = document.createElement('div');
brandContainer.className = 'brand-switcher-container';
sidebar.appendChild(brandContainer);
initBrandSwitcher(brandContainer);

const navLinks = document.createElement('div');
navLinks.className = 'nav-links';

const pages = [
  { hash: '', label: 'Home' },
  { hash: 'bevels', label: 'Bevels' },
  { hash: 'glows', label: 'Glows' },
  { hash: 'forms', label: 'Forms' },
  { hash: 'tokens', label: 'Tokens' },
];

for (const page of pages) {
  const link = document.createElement('a');
  link.href = `#/${page.hash}`;
  link.textContent = page.label;
  link.className = 'nav-link';
  navLinks.appendChild(link);
}

sidebar.appendChild(navLinks);

// Initialize router
initRouter(routes, content);
