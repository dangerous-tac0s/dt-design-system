import { DTCard, DTStaggerContainer } from '@dangerousthings/react';
import type { DTVariant } from '@dangerousthings/tokens';
import { Section, CodeLabel } from '../components/Section';

const categories: { hash: string; title: string; desc: string; mode: DTVariant; count: number }[] = [
  { hash: 'bevels', title: 'Bevels', desc: 'Angular clip-path patterns — cards, buttons, badges, media frames, modals, drawers', mode: 'normal', count: 8 },
  { hash: 'glows', title: 'Glows', desc: 'Neon drop-shadow and text-shadow effects for the DT brand', mode: 'emphasis', count: 6 },
  { hash: 'forms', title: 'Forms', desc: 'Text inputs, checkboxes, switches, radios, progress bars, accordions, steppers', mode: 'success', count: 7 },
  { hash: 'animations', title: 'Animations', desc: 'Entrance animations, stagger containers, transition utilities, scrollbar styling', mode: 'other', count: 5 },
  { hash: 'cards-advanced', title: 'Advanced Cards', desc: 'Card color modes, progress bars, badge overlays, interactive bevel buttons, feature legend', mode: 'warning', count: 6 },
  { hash: 'tokens', title: 'Tokens', desc: 'Color palette, typography, spacing, and shape values for the active brand', mode: 'normal', count: 3 },
];

function HexDecor({ color, size = 14, opacity = 0.5 }: { color: string; size?: number; opacity?: number }) {
  return (
    <svg width={size * 2} height={size * 2} viewBox="0 0 28 28" style={{ opacity }}>
      <polygon
        points="14,1 25.5,7.5 25.5,20.5 14,27 2.5,20.5 2.5,7.5"
        fill={color}
      />
    </svg>
  );
}

export function HomePage() {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          color: 'var(--color-primary)',
          fontSize: '2.5rem',
          fontWeight: 900,
          letterSpacing: '0.15em',
          marginBottom: '0.25rem',
          textTransform: 'uppercase',
        }}>
          DANGEROUS THINGS
        </h1>
        <p style={{
          color: 'var(--mode-emphasis, var(--color-secondary))',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: 0,
        }}>
          DESIGN SYSTEM
        </p>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.8rem',
          marginTop: 'var(--space-2)',
        }}>
          React component showcase — switch brands and modes in the sidebar
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginTop: 'var(--space-6)',
        }}>
          <HexDecor color="var(--mode-normal, var(--color-primary))" opacity={0.4} />
          <HexDecor color="var(--mode-emphasis, var(--color-secondary))" opacity={0.6} />
          <HexDecor color="var(--mode-warning, var(--color-error))" opacity={0.4} />
          <HexDecor color="var(--mode-success, var(--color-accent))" opacity={0.6} />
          <HexDecor color="var(--mode-other, var(--color-other))" opacity={0.4} />
        </div>
      </div>

      <p style={{
        color: 'var(--color-text-muted)',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: 'var(--space-4)',
      }}>
        COMPONENT CATALOG
      </p>

      <DTStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-dt-4">
        {categories.map(cat => (
          <a key={cat.hash} href={`#/${cat.hash}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <DTCard variant={cat.mode} title={cat.title.toUpperCase()}>
              <div className="card-body">{cat.desc}</div>
              {cat.count > 0 && (
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', marginTop: 'var(--space-2)' }}>
                  {cat.count} components
                </div>
              )}
            </DTCard>
          </a>
        ))}
      </DTStaggerContainer>

      <Section title="Quick Start" description="Import the React components and CSS to get started.">
        <div className="terminal dt-accent-top">
          <code>{`import { DTCard, DTButton } from '@dangerousthings/react';\nimport '@dangerousthings/web/index.css';`}</code>
        </div>
      </Section>
    </>
  );
}
