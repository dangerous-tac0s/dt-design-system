import type { HexGridBackgroundProps } from '@dangerousthings/hex-background';
import { Section } from '../components/Section';

const DEFAULTS: Required<HexGridBackgroundProps> = {
  opacity: 0.5,
  hexRadius: 0.5,
  margin: 0.05,
  maxHeight: 3,
  animationInterval: 1500,
  cameraSpeed: 0.02,
  cameraRadius: 8,
  fov: 40,
};

interface SliderConfig {
  key: keyof HexGridBackgroundProps;
  label: string;
  min: number;
  max: number;
  step: number;
}

const sliders: SliderConfig[] = [
  { key: 'opacity', label: 'Opacity', min: 0, max: 1, step: 0.05 },
  { key: 'hexRadius', label: 'Hex Radius', min: 0.1, max: 2, step: 0.1 },
  { key: 'margin', label: 'Margin', min: 0, max: 0.5, step: 0.01 },
  { key: 'maxHeight', label: 'Max Height', min: 0.5, max: 10, step: 0.5 },
  { key: 'animationInterval', label: 'Animation Interval (ms)', min: 200, max: 5000, step: 100 },
  { key: 'cameraSpeed', label: 'Camera Speed', min: 0, max: 0.2, step: 0.005 },
  { key: 'cameraRadius', label: 'Camera Radius', min: 3, max: 20, step: 0.5 },
  { key: 'fov', label: 'Field of View', min: 20, max: 90, step: 1 },
];

interface HexBackgroundPageProps {
  hexProps: HexGridBackgroundProps;
  onHexPropsChange: (props: HexGridBackgroundProps) => void;
}

export function HexBackgroundPage({ hexProps, onHexPropsChange }: HexBackgroundPageProps) {
  const handleChange = (key: keyof HexGridBackgroundProps, value: number) => {
    onHexPropsChange({ ...hexProps, [key]: value });
  };

  const handleReset = () => {
    onHexPropsChange({ ...DEFAULTS });
  };

  return (
    <>
      <h1 className="page-title">Hex Background</h1>
      <p className="page-subtitle">
        3D hexagon grid background powered by Three.js + React Three Fiber.
        Adjust parameters below — changes apply to the global background in real time.
      </p>

      <Section title="Parameters" description="All HexGridBackground props exposed as controls.">
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          {sliders.map(({ key, label, min, max, step }) => (
            <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {label}
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={hexProps[key] ?? DEFAULTS[key]}
                  onChange={e => handleChange(key, parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </label>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                minWidth: '4.5em',
                textAlign: 'right',
              }}>
                {hexProps[key] ?? DEFAULTS[key]}
              </span>
            </div>
          ))}
        </div>

        <button
          className="dt-btn mode-normal"
          onClick={handleReset}
          type="button"
          style={{ marginTop: 'var(--space-6)' }}
        >
          Reset to Defaults
        </button>
      </Section>

      <Section title="Usage" description="Drop-in component for any React app with Three.js.">
        <div className="terminal dt-accent-top">
          <code>{`import { HexGridBackground } from '@dangerousthings/hex-background';

// Full-viewport fixed background (renders behind content)
<HexGridBackground
  opacity={${hexProps.opacity ?? DEFAULTS.opacity}}
  hexRadius={${hexProps.hexRadius ?? DEFAULTS.hexRadius}}
  maxHeight={${hexProps.maxHeight ?? DEFAULTS.maxHeight}}
  cameraSpeed={${hexProps.cameraSpeed ?? DEFAULTS.cameraSpeed}}
/>`}</code>
        </div>
      </Section>
    </>
  );
}
