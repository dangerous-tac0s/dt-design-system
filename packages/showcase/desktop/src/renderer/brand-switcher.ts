import { themes } from '@dangerousthings/tokens';
import type { ThemeBrand, ThemeMode } from '@dangerousthings/tokens';

let currentBrand: ThemeBrand = 'dt';
let currentMode: ThemeMode = 'dark';

export function initBrandSwitcher(container: HTMLElement) {
  // Brand buttons
  for (const theme of themes) {
    const btn = document.createElement('button');
    btn.textContent = theme.name;
    btn.className = 'brand-btn';
    btn.dataset.brand = theme.id;
    if (theme.id === currentBrand) btn.classList.add('active');
    btn.addEventListener('click', () => switchBrand(theme.id));
    container.appendChild(btn);
  }

  // Mode switcher
  const modeContainer = document.createElement('div');
  modeContainer.className = 'mode-switcher';

  const modes: ThemeMode[] = ['dark', 'light', 'auto'];
  for (const mode of modes) {
    const btn = document.createElement('button');
    btn.textContent = mode;
    btn.className = 'mode-btn';
    btn.dataset.mode = mode;
    if (mode === currentMode) btn.classList.add('active');
    btn.addEventListener('click', () => switchMode(mode));
    modeContainer.appendChild(btn);
  }

  container.appendChild(modeContainer);

  // Set initial state
  applyTheme();
}

function switchBrand(id: ThemeBrand) {
  currentBrand = id;
  applyTheme();
  updateBrandButtons();
}

function switchMode(mode: ThemeMode) {
  currentMode = mode;
  applyTheme();
  updateModeButtons();
}

function applyTheme() {
  document.documentElement.setAttribute('data-brand', currentBrand);
  document.documentElement.setAttribute('data-theme', currentMode);
}

function updateBrandButtons() {
  document.querySelectorAll('.brand-btn').forEach((btn) => {
    const el = btn as HTMLButtonElement;
    el.classList.toggle('active', el.dataset.brand === currentBrand);
  });
}

function updateModeButtons() {
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    const el = btn as HTMLButtonElement;
    el.classList.toggle('active', el.dataset.mode === currentMode);
  });
}

export function getCurrentBrand(): ThemeBrand {
  return currentBrand;
}

export function getCurrentMode(): ThemeMode {
  return currentMode;
}
