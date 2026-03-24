import { useState } from 'react';
import { DTCard, DTModal, DTDrawer } from '@dangerousthings/react';
import type { DTVariant } from '@dangerousthings/tokens';
import { Section, Row, CodeLabel } from '../components/Section';

const modes: DTVariant[] = ['normal', 'emphasis', 'warning', 'success', 'other'];

export function BevelsPage() {
  const [modalVariant, setModalVariant] = useState<DTVariant | null>(null);
  const [drawerSide, setDrawerSide] = useState<'right' | 'left' | null>(null);

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

<Section title="Badge Bevels" description="Top-right bevel with dual-element technique. Color variants via CSS custom properties.">
        <Row>
          <span className="badge">DEFAULT</span>
          <span className="badge badge-success">IN STOCK</span>
          <span className="badge badge-error">SOLD OUT</span>
          <span className="badge badge-warning">LAB</span>
          <span className="badge badge-info">NFC</span>
        </Row>
        <CodeLabel text=".badge | .badge-success | .badge-error | .badge-warning | .badge-info" />
      </Section>

      <Section title="Media Frame Bevels" description="Diagonal opposite corners (top-left + bottom-right). Dual-element border with inner surface fill.">
        <div className="grid grid-cols-3 gap-dt-4">
          <div className="dt-bevel-media mode-normal" style={{ aspectRatio: '16/9' }}>
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=338&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="dt-bevel-media mode-emphasis" style={{ aspectRatio: '16/9' }}>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=338&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="dt-bevel-media mode-warning" style={{ aspectRatio: '16/9' }} />
        </div>
        <CodeLabel text=".dt-bevel-media | .dt-bevel-media (no img = 'MISSING MEDIA' placeholder)" />
      </Section>

      <Section title="Modals" description="Beveled card dialog with backdrop blur. Click to open, click backdrop or press Escape to dismiss.">
        <Row>
          {modes.map(mode => (
            <button key={mode} className={`dt-menu-item mode-${mode}`} type="button" onClick={() => setModalVariant(mode)}>
              {mode} Modal
            </button>
          ))}
        </Row>
        <CodeLabel text="<DTModal variant='normal' visible onDismiss title='...'>content</DTModal>" />
        <DTModal visible={modalVariant !== null} onDismiss={() => setModalVariant(null)} variant={modalVariant ?? 'normal'} title={`${modalVariant ?? 'normal'} Modal`}>
          <p style={{ marginBottom: 'var(--space-4)' }}>This is a <strong>{modalVariant}</strong> modal with beveled card shape, backdrop blur, and scale-in animation.</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Click the backdrop or press Escape to dismiss.</p>
        </DTModal>
      </Section>

      <Section title="Drawers" description="Sliding side panel with beveled edges. Click to open from either side.">
        <Row>
          <button className="dt-menu-item mode-emphasis" type="button" onClick={() => setDrawerSide('right')}>
            OPEN RIGHT DRAWER
          </button>
          <button className="dt-menu-item mode-other" type="button" onClick={() => setDrawerSide('left')}>
            OPEN LEFT DRAWER
          </button>
        </Row>
        <CodeLabel text="<DTDrawer position='right' heading='...' visible onDismiss>content</DTDrawer>" />
        <DTDrawer visible={drawerSide !== null} onDismiss={() => setDrawerSide(null)} position={drawerSide ?? 'right'} heading={`${drawerSide ?? 'right'} Drawer`} headingVariant={drawerSide === 'left' ? 'other' : 'emphasis'}>
          <p style={{ marginBottom: 'var(--space-4)' }}>Sliding panel from the <strong>{drawerSide}</strong> edge with beveled corners and backdrop blur.</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Click the backdrop, press Escape, or click ✕ to dismiss.</p>
        </DTDrawer>
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
          <span style={{ fontWeight: 600 }}>Thick Top Border Accent</span>
        </div>
        <CodeLabel text=".dt-accent-top" />
      </Section>

      <Section title="Card Color Modes" description="Per-card mode coloring — see Advanced Cards page for full demos.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-dt-3">
          {modes.map(mode => (
            <DTCard key={mode} variant={mode} title={mode}>
              <div className="card-body" style={{ fontSize: '0.75rem' }}>mode-{mode}</div>
            </DTCard>
          ))}
        </div>
        <CodeLabel text="<DTCard variant='normal'> | 'emphasis' | 'warning' | 'success' | 'other'" />
      </Section>
    </>
  );
}
