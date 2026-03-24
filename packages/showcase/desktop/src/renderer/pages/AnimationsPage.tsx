import { useState, useEffect, useRef } from 'react';
import { DTCard } from '@dangerousthings/react';
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

const VARIANTS = ['normal', 'emphasis', 'warning', 'success', 'other'] as const;

function ProgressBarDemo() {
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0, 0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [running, setRunning] = useState(false);

  const animate = () => {
    // Reset then animate up
    setProgress([0, 0, 0, 0, 0]);
    setRunning(true);
    let tick = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      tick++;
      setProgress(prev =>
        prev.map((_, i) => Math.min(100, Math.round(tick * (1.5 + i * 0.4))))
      );
      if (tick > 80) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 40);
  };

  useEffect(() => {
    // Auto-run on mount
    const t = setTimeout(animate, 500);
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
        {VARIANTS.map((v, i) => (
          <DTCard
            key={v}
            variant={v}
            title={`${v} ${progress[i]}%`}
            progress={progress[i]}
            style={{ width: 160, transition: 'all 0.1s ease-out' }}
          >
            <div className="card-body" style={{ fontSize: '0.75rem', minHeight: 60, display: 'flex', alignItems: 'center' }}>
              Progress fills the left edge from bottom to top
            </div>
          </DTCard>
        ))}
      </div>
      <button
        className="btn-secondary"
        onClick={animate}
        disabled={running}
        type="button"
      >
        {running ? 'ANIMATING...' : 'REPLAY PROGRESS'}
      </button>
    </div>
  );
}

export function AnimationsPage() {
  const [entranceKey, setEntranceKey] = useState(0);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  return (
    <>
      <h1 className="page-title">Animations</h1>
      <p className="page-subtitle">Entrance animations, interactive effects, and transition utilities.</p>

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

      <Section title="Card Progress Bar" description="Cards have a vertical progress bar on the left edge. Animate it by transitioning --dt-card-progress from 0 to 100.">
        <ProgressBarDemo />
        <CodeLabel text="<DTCard progress={value} /> — CSS ::after gradient driven by --dt-card-progress" />
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
