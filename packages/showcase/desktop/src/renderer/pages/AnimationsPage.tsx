import { useState } from 'react';
import { DTCard, DTStaggerContainer } from '@dangerousthings/react';
import { Section, Row, CodeLabel } from '../components/Section';

function AnimBox({ className, label }: { className: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className={className}
        style={{
          background: 'var(--color-primary)',
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: 'var(--color-bg)',
          fontSize: '0.7rem',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function AnimationsPage() {
  const [entranceKey, setEntranceKey] = useState(0);
  const [staggerKey, setStaggerKey] = useState(0);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  return (
    <>
      <h1 className="page-title">Animations</h1>
      <p className="page-subtitle">Entrance animations, interactive effects, stagger containers, and transition utilities.</p>

      <Section title="Entrance Animations" description="One-shot animations for elements entering the viewport.">
        <Row key={entranceKey}>
          <AnimBox className="dt-animate-scale-in" label="SCALE IN" />
          <AnimBox className="dt-animate-fade-in" label="FADE IN" />
          <AnimBox className="dt-animate-slide-up" label="SLIDE UP" />
        </Row>
        <button className="btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => setEntranceKey(k => k + 1)} type="button">
          REPLAY
        </button>
        <CodeLabel text=".dt-animate-scale-in | .dt-animate-fade-in | .dt-animate-slide-up" />
      </Section>

      <Section title="Interactive Animations" description="Looping animations for active/loading states.">
        <Row>
          <AnimBox className="dt-animate-pulse" label="PULSE" />
          <AnimBox className="dt-animate-ping" label="PING" />
          <AnimBox className="dt-animate-spin" label="SPIN" />
        </Row>
        <CodeLabel text=".dt-animate-pulse | .dt-animate-ping | .dt-animate-spin" />
      </Section>

      <Section title="Stagger Container" description="Automatic staggered scale-in animation for child elements. Customizable via --dt-stagger-duration and --dt-stagger-interval.">
        <DTStaggerContainer
          key={staggerKey}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-dt-3"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <DTCard key={i} title={`CARD ${i + 1}`} style={{ textAlign: 'center' }}>
              <div className="card-body" style={{ fontSize: '0.75rem' }}>Item #{i + 1}</div>
            </DTCard>
          ))}
        </DTStaggerContainer>
        <button
          className="btn-secondary"
          style={{ marginTop: 'var(--space-4)' }}
          onClick={() => setStaggerKey(k => k + 1)}
          type="button"
        >
          REPLAY STAGGER
        </button>
        <CodeLabel text="<DTStaggerContainer> — nth-child delays up to 24 children" />
      </Section>

      <Section title="Transition Utilities" description="Accordion expand, chevron rotation, and progress bar transitions.">
        <div style={{ maxWidth: 400 }}>
          <button
            className="dt-accent-top"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
            aria-expanded={accordionExpanded}
            onClick={() => setAccordionExpanded(!accordionExpanded)}
            type="button"
          >
            Click to expand
            <span style={{
              display: 'inline-block',
              transition: 'transform 250ms ease-in-out',
              transform: accordionExpanded ? 'rotate(180deg)' : undefined,
            }}>
              &#x25BC;
            </span>
          </button>
          <div style={{
            maxHeight: accordionExpanded ? 200 : 0,
            overflow: 'hidden',
            transition: 'max-height 250ms ease-in-out',
          }}>
            <div style={{
              padding: 'var(--space-4)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderTop: 'none',
            }}>
              This content expands with a smooth max-height transition. The chevron rotates 180 degrees.
            </div>
          </div>
        </div>
        <CodeLabel text=".dt-transition-accordion | .dt-transition-chevron | .dt-transition-progress" />
      </Section>

      <Section title="Scrollbar Styling" description="Thin neon scrollbar scoped under [data-brand='dt'].">
        <div
          className="dt-scrollbar"
          style={{
            maxHeight: 120,
            overflowY: 'auto',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-3)',
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ padding: '4px 0', color: 'var(--color-text)' }}>
              Scrollbar line {i + 1} — thin neon scrollbar styled with --color-primary
            </div>
          ))}
        </div>
        <CodeLabel text=".dt-scrollbar — scrollbar-color: var(--color-primary)" />
      </Section>
    </>
  );
}
