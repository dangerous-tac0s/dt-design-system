import { brands } from '@dangerousthings/tokens';
import type { ThemeBrand } from '@dangerousthings/tokens';
import { Section, CodeLabel } from '../components/Section';

interface TokensPageProps {
  brand: ThemeBrand;
}

export function TokensPage({ brand: brandId }: TokensPageProps) {
  const brand = brands[brandId];
  if (!brand) return null;

  const darkColors = brand.dark;
  const darkEntries = Object.entries(darkColors) as [string, string][];
  const lightColors = brand.light;
  const lightEntries = Object.entries(lightColors) as [string, string][];

  return (
    <>
      <h1 className="page-title">Tokens</h1>
      <p className="page-subtitle">Design token values for the active brand. Switch brands in the sidebar.</p>

      <Section title={`Color Palette — ${brand.name} (Dark Mode)`} description={brand.description}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          {darkEntries.map(([name, hex]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: 32, height: 32, background: hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', opacity: 0.5 }}>{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Color Palette — ${brand.name} (Light Mode)`} description="Light mode color tokens.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          {lightEntries.map(([name, hex]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: 32, height: 32, background: hex, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', opacity: 0.5 }}>{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" description="Font family tokens for headings, body text, and monospace.">
        <div className="terminal" style={{ marginBottom: 'var(--space-4)' }}>
          <code>{`heading: ${brand.typography.heading}\nbody:    ${brand.typography.body}\nmono:    ${brand.typography.mono}`}</code>
        </div>
      </Section>

      <Section title="Typography Scale" description="Live rendering with the current brand's font families.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900 }}>Heading 1</h1>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}>Heading 2</h2>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}>Heading 3</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>Body text — the quick brown fox jumps over the lazy dog</p>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{'const monospace = "code";'}</code>
        </div>
      </Section>

      <Section title="Shape Tokens" description="Bevel and radius values determine the visual language — angular (DT) vs rounded (Classic).">
        <div className="terminal" style={{ marginBottom: 'var(--space-4)' }}>
          <code>{`bevelSm:  ${brand.shape.bevelSm}\nbevelMd:  ${brand.shape.bevelMd}\nbevelLg:  ${brand.shape.bevelLg}\nradiusSm: ${brand.shape.radiusSm}\nradius:   ${brand.shape.radius}\nradiusLg: ${brand.shape.radiusLg}`}</code>
        </div>
      </Section>

      <Section title="Spacing Scale" description="Shared spacing tokens across all brands.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {[
            { name: '--space-1', value: '0.25rem (4px)', width: '1.5rem' },
            { name: '--space-2', value: '0.5rem (8px)', width: '3rem' },
            { name: '--space-3', value: '0.75rem (12px)', width: '4.5rem' },
            { name: '--space-4', value: '1rem (16px)', width: '6rem' },
            { name: '--space-6', value: '1.5rem (24px)', width: '9rem' },
            { name: '--space-8', value: '2rem (32px)', width: '12rem' },
          ].map(sp => (
            <div key={sp.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: sp.width, height: 12, background: 'var(--color-primary)', opacity: 0.6 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.6 }}>{sp.name}: {sp.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CSS Custom Properties" description="These are generated from TypeScript tokens and applied per-brand via data-brand attribute.">
        <div className="terminal">
          <code>{`/* Generated CSS custom properties */\n--color-bg: ${darkColors.bg};\n--color-primary: ${darkColors.primary};\n--color-secondary: ${darkColors.secondary};\n--color-error: ${darkColors.error};\n--color-success: ${darkColors.success};\n--bevel-sm: ${brand.shape.bevelSm};\n--bevel-md: ${brand.shape.bevelMd};\n--font-heading: ${brand.typography.heading};`}</code>
        </div>
        <CodeLabel text="See packages/tokens/src/scripts/generate-css.ts" />
      </Section>
    </>
  );
}
