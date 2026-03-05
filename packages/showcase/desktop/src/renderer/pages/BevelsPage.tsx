import { DTCard, DTMediaFrame } from '@dangerousthings/react';
import type { DTVariant } from '@dangerousthings/tokens';
import { Section, Row, CodeLabel } from '../components/Section';

const modes: DTVariant[] = ['normal', 'emphasis', 'warning', 'success', 'other'];

export function BevelsPage() {
  return (
    <>
      <h1 className="page-title">Bevels</h1>
      <p className="page-subtitle">Angular clip-path patterns from the DT design system. Active on the DT brand.</p>

      <Section title="Card Bevels" description="Dual bottom bevels using clip-path. Outer bg = border color, ::before = surface fill.">
        <DTCard title="CARD TITLE">
          <div className="card-body">Dual bottom bevels — bottom-right (bevel-md) and bottom-left (bevel-sm). Uses the dual-element technique with ::before pseudo-element.</div>
        </DTCard>
        <CodeLabel text="<DTCard title='...'> or .card" />
        <DTCard>
          <div className="card-body">Card without title — no header bar, just the beveled container.</div>
        </DTCard>
        <CodeLabel text="<DTCard> (no title prop)" />
      </Section>

      <Section title="Button Bevels" description="Top-right corner cut. Filled buttons use direct clip-path, outline uses dual-element.">
        <Row>
          <button className="btn-primary" type="button">PRIMARY</button>
          <button className="btn-secondary" type="button">SECONDARY</button>
          <button className="btn-danger" type="button">DANGER</button>
        </Row>
        <CodeLabel text=".btn-primary | .btn-secondary | .btn-danger" />
      </Section>

      <Section title="Badge Bevels" description="Top-right bevel with dual-element technique. Color variants via CSS custom properties.">
        <Row>
          <span className="badge">Default</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-error">Error</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-info">Info</span>
        </Row>
        <CodeLabel text=".badge | .badge-success | .badge-error | .badge-warning | .badge-info" />
      </Section>

      <Section title="Media Frame Bevels" description="Diagonal opposite corners (top-left + bottom-right).">
        <DTMediaFrame>
          <div style={{ background: 'var(--color-primary)', width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-bg)', fontWeight: 700 }}>MEDIA FRAME</span>
          </div>
        </DTMediaFrame>
        <CodeLabel text="<DTMediaFrame> or .dt-bevel-media" />
      </Section>

      <Section title="Modal Bevels" description="Dual bottom bevels at bevel-lg scale.">
        <div className="dt-bevel-modal" style={{ background: 'var(--color-primary)', padding: 'var(--space-8)', textAlign: 'center' }}>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)' }}>
            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>Modal Content</div>
            <div style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>Large dual bottom bevels</div>
          </div>
        </div>
        <CodeLabel text=".dt-bevel-modal" />
      </Section>

      <Section title="Drawer Bevels" description="Exposed-edge bevels for sliding panels.">
        <Row>
          <div className="dt-bevel-drawer-right" style={{ background: 'var(--color-primary)', padding: 'var(--space-6)', width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-bg)', fontWeight: 700 }}>RIGHT</span>
          </div>
          <div className="dt-bevel-drawer-left" style={{ background: 'var(--color-primary)', padding: 'var(--space-6)', width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-bg)', fontWeight: 700 }}>LEFT</span>
          </div>
        </Row>
        <CodeLabel text=".dt-bevel-drawer-right | .dt-bevel-drawer-left" />
      </Section>

      <Section title="Small Bevel Utility" description="For compact elements — arrows, stepper buttons.">
        <Row>
          <div className="dt-bevel-sm" style={{ background: 'var(--color-primary)', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-bg)', fontWeight: 700, fontSize: '0.75rem' }}>SM</span>
          </div>
        </Row>
        <CodeLabel text=".dt-bevel-sm" />
      </Section>

      <Section title="Accent Top" description="Used on accordion headers and menu items.">
        <div className="dt-accent-top" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>Thick Top Border Accent</span>
        </div>
        <CodeLabel text=".dt-accent-top" />
      </Section>

      <Section title="Card Color Modes" description="Per-card mode coloring — see Advanced Cards page for full demos.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-dt-3">
          {modes.map(mode => (
            <DTCard key={mode} variant={mode} title={mode.toUpperCase()}>
              <div className="card-body" style={{ fontSize: '0.75rem' }}>mode-{mode}</div>
            </DTCard>
          ))}
        </div>
        <CodeLabel text="<DTCard variant='normal'> | 'emphasis' | 'warning' | 'success' | 'other'" />
      </Section>
    </>
  );
}
