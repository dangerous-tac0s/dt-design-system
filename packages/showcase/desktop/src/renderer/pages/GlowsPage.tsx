import { DTCard } from '@dangerousthings/react';
import { Section, Row, CodeLabel } from '../components/Section';

export function GlowsPage() {
  return (
    <>
      <h1 className="page-title">Glows</h1>
      <p className="page-subtitle">Neon drop-shadow and text-shadow effects. Active on the DT brand.</p>

      <Section title="Button Glows" description="filter: drop-shadow() follows clip-path shape. Hover for enhanced glow.">
        <Row>
          <button className="btn-primary" type="button">PRIMARY GLOW</button>
          <button className="btn-danger" type="button">DANGER GLOW</button>
        </Row>
        <CodeLabel text={'.btn-primary / .btn-danger — automatic on [data-brand="dt"]'} />
        <br />
        <Row>
          <button className="btn-secondary" type="button">SECONDARY (HOVER)</button>
        </Row>
        <CodeLabel text=".btn-secondary — glow on hover" />
      </Section>

      <Section title="Link Glow" description="text-shadow on hover. Respects --dt-glow-color when set by a parent mode.">
        <Row>
          <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.125rem' }}>
            Hover this link for text glow
          </a>
        </Row>
        <CodeLabel text="a:hover — uses var(--dt-glow-color, var(--color-primary))" />
      </Section>

      <Section title="Mode-Aware Link Glow" description="Links inside mode containers glow with that mode's color.">
        <Row>
          {(['normal', 'emphasis', 'warning', 'success', 'other'] as const).map(mode => (
            <div key={mode} className={`mode-${mode}`} style={{ padding: 'var(--space-3)' }}>
              <a href="#" style={{ fontWeight: 600, fontSize: '1rem' }}>{mode.toUpperCase()}</a>
            </div>
          ))}
        </Row>
        <CodeLabel text=".mode-emphasis a:hover — glows yellow via --dt-glow-color" />
      </Section>

      <Section title="Terminal Inset Glow" description="Inset + outer box-shadow. No clip-path so box-shadow works directly.">
        <div className="terminal dt-accent-top">
          <code>{'$ dt-web-theme --install\n> Installing design tokens...\n> Applying cyberpunk aesthetic...\n> Done. Welcome to the future.'}</code>
        </div>
        <CodeLabel text={'.terminal — automatic on [data-brand="dt"]'} />
      </Section>

      <Section title="Card Hover Glow" description="filter: drop-shadow() respects the beveled clip-path.">
        <DTCard title="HOVER ME" style={{ cursor: 'pointer' }}>
          <div className="card-body">Cards get a drop-shadow glow on hover.</div>
        </DTCard>
        <CodeLabel text={'.card:hover — automatic on [data-brand="dt"]'} />
      </Section>

      <Section title="Input Focus Glow" description="box-shadow: 0 4px 0 1px — bright bar beneath the input.">
        <input
          type="text"
          className="input"
          placeholder="Click to focus — see the glow bar"
          style={{ maxWidth: 400 }}
        />
        <CodeLabel text={'.input:focus — automatic on [data-brand="dt"]'} />
      </Section>

      <Section title="Glow Utilities" description="Generic utility classes for applying glow effects to any element.">
        <Row>
          <div className="dt-glow" style={{ background: 'var(--color-primary)', padding: 'var(--space-4) var(--space-6)', display: 'inline-block', fontWeight: 700, color: 'var(--color-bg)' }}>.dt-glow</div>
          <div className="dt-glow-strong" style={{ background: 'var(--color-primary)', padding: 'var(--space-4) var(--space-6)', display: 'inline-block', fontWeight: 700, color: 'var(--color-bg)' }}>.dt-glow-strong</div>
        </Row>
        <CodeLabel text=".dt-glow | .dt-glow-strong" />
        <Row>
          <div className="dt-glow-inset" style={{ padding: 'var(--space-4) var(--space-6)', display: 'inline-block', fontWeight: 700, border: '1px solid var(--color-border)' }}>.dt-glow-inset</div>
          <div className="dt-text-glow" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', display: 'inline-block' }}>.dt-text-glow</div>
        </Row>
        <CodeLabel text=".dt-glow-inset | .dt-text-glow" />
      </Section>
    </>
  );
}
