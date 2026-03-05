import { useState, useEffect } from 'react';
import { themes } from '@dangerousthings/tokens';
import type { ThemeBrand, ThemeMode } from '@dangerousthings/tokens';
import { HomePage } from './pages/HomePage';
import { BevelsPage } from './pages/BevelsPage';
import { GlowsPage } from './pages/GlowsPage';
import { FormsPage } from './pages/FormsPage';
import { AnimationsPage } from './pages/AnimationsPage';
import { CardsAdvancedPage } from './pages/CardsAdvancedPage';
import { TokensPage } from './pages/TokensPage';

const navPages = [
  { hash: '', label: 'Home' },
  { hash: 'bevels', label: 'Bevels' },
  { hash: 'glows', label: 'Glows' },
  { hash: 'forms', label: 'Forms' },
  { hash: 'animations', label: 'Animations' },
  { hash: 'cards-advanced', label: 'Advanced Cards' },
  { hash: 'tokens', label: 'Tokens' },
];

export function App() {
  const [brand, setBrand] = useState<ThemeBrand>('dt');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [currentHash, setCurrentHash] = useState('');

  // Sync brand/theme to <html> so CSS custom properties cascade everywhere
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
    document.documentElement.setAttribute('data-theme', theme);
  }, [brand, theme]);

  // Hash-based routing
  useEffect(() => {
    function onHashChange() {
      setCurrentHash(window.location.hash.replace('#/', '').replace('#', ''));
    }
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function renderPage() {
    switch (currentHash) {
      case 'bevels': return <BevelsPage />;
      case 'glows': return <GlowsPage />;
      case 'forms': return <FormsPage />;
      case 'animations': return <AnimationsPage />;
      case 'cards-advanced': return <CardsAdvancedPage />;
      case 'tokens': return <TokensPage brand={brand} />;
      default: return <HomePage />;
    }
  }

  return (
    <>
      <nav id="sidebar">
        <div className="nav-title">DT DESIGN SYSTEM</div>
        <div className="brand-switcher-container">
          {themes.map(t => (
            <button
              key={t.id}
              className={`brand-btn${t.id === brand ? ' active' : ''}`}
              onClick={() => setBrand(t.id)}
              type="button"
            >
              {t.name}
            </button>
          ))}
          <div className="mode-switcher">
            {(['dark', 'light', 'auto'] as ThemeMode[]).map(m => (
              <button
                key={m}
                className={`mode-btn${m === theme ? ' active' : ''}`}
                onClick={() => setTheme(m)}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-links">
          {navPages.map(p => (
            <a
              key={p.hash}
              href={`#/${p.hash}`}
              className={`nav-link${p.hash === currentHash ? ' active' : ''}`}
            >
              {p.label}
            </a>
          ))}
        </div>
      </nav>
      <main id="content">
        {renderPage()}
      </main>
    </>
  );
}
