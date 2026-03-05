import { useState } from 'react';
import {
  DTTextInput,
  DTCheckbox,
  DTSwitch,
  DTRadioGroup,
  DTProgressBar,
  DTAccordion,
  DTQuantityStepper,
} from '@dangerousthings/react';
import type { DTAccordionSection } from '@dangerousthings/react';
import { Section, Row, CodeLabel, DemoLabel } from '../components/Section';

export function FormsPage() {
  const [checks, setChecks] = useState({ a: false, b: true, c: true, d: false });
  const [switches, setSwitches] = useState({ a: false, b: true, c: true, d: false });
  const [radioValue, setRadioValue] = useState('nfc');
  const [stepperValue, setStepperValue] = useState(1);

  const accordionSections: DTAccordionSection[] = [
    { key: 'size', title: 'Size', children: <div style={{ padding: 'var(--space-4)' }}>Small, Medium, Large options available.</div> },
    { key: 'chip', title: 'Chip Type', children: <div style={{ padding: 'var(--space-4)' }}>NTAG, DESFire, MIFARE Classic.</div> },
    { key: 'freq', title: 'Frequency', children: <div style={{ padding: 'var(--space-4)' }}>13.56 MHz (HF), 125 kHz (LF).</div> },
  ];

  return (
    <>
      <h1 className="page-title">Forms</h1>
      <p className="page-subtitle">DT-branded form components using @dangerousthings/react.</p>

      <Section title="Text Input" description="Sharp corners + focus glow bar. 2px solid border, no border-radius.">
        <DTTextInput placeholder="Normal input — click to focus" style={{ maxWidth: 400 }} />
        <CodeLabel text="<DTTextInput /> — focus glow bar" />
        <br />
        <DTTextInput error placeholder="Error state input" style={{ maxWidth: 400 }} />
        <CodeLabel text="<DTTextInput error /> — red focus bar" />
        <br />
        <textarea placeholder="Textarea element" style={{ maxWidth: 400, minHeight: 80 }} />
        <CodeLabel text="textarea — same styling" />
      </Section>

      <Section title="Checkbox" description="Beveled hexagon shape via clip-path. 30% corner cuts.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <DTCheckbox checked={checks.a} onChange={v => setChecks(p => ({ ...p, a: v }))} label="Unchecked checkbox" />
          <DTCheckbox checked={checks.b} onChange={v => setChecks(p => ({ ...p, b: v }))} label="Checked checkbox" />
          <DTCheckbox checked={checks.c} onChange={() => {}} disabled label="Disabled checked" />
          <DTCheckbox checked={checks.d} onChange={() => {}} disabled label="Disabled unchecked" />
        </div>
        <CodeLabel text="<DTCheckbox checked onChange label />" />
      </Section>

      <Section title="Switch / Toggle" description="Angular track + sliding square thumb. 48x26 track, 20x20 thumb.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <DTSwitch checked={switches.a} onChange={v => setSwitches(p => ({ ...p, a: v }))} label="Off" />
          <DTSwitch checked={switches.b} onChange={v => setSwitches(p => ({ ...p, b: v }))} label="On" />
          <DTSwitch checked={switches.c} onChange={() => {}} disabled label="Disabled (on)" />
          <DTSwitch checked={switches.d} onChange={() => {}} disabled label="Disabled (off)" />
        </div>
        <CodeLabel text="<DTSwitch checked onChange label />" />
      </Section>

      <Section title="Radio Button" description="Hexagonal indicator via clip-path. Flat-top hexagon shape.">
        <DTRadioGroup
          options={[
            { value: 'nfc', label: 'NFC (Near Field Communication)' },
            { value: 'rfid', label: 'RFID (Radio Frequency ID)' },
            { value: 'ble', label: 'BLE (Bluetooth Low Energy)' },
          ]}
          value={radioValue}
          onChange={setRadioValue}
        />
        <CodeLabel text="<DTRadioGroup options value onChange />" />
      </Section>

      <Section title="Progress Bar" description="Angular, no border-radius. 4px default height.">
        <DemoLabel text="25%" />
        <DTProgressBar value={0.25} />
        <DemoLabel text="50% WITH LABEL" />
        <DTProgressBar value={0.5} label="50%" />
        <DemoLabel text="75%" />
        <DTProgressBar value={0.75} />
        <DemoLabel text="100%" />
        <DTProgressBar value={1.0} label="100%" />
        <CodeLabel text="<DTProgressBar value={0.5} label='50%' />" />
      </Section>

      <Section title="Accordion" description="Click headers to expand. 5px top border, chevron rotation.">
        <DTAccordion sections={accordionSections} />
        <CodeLabel text="<DTAccordion sections={[{ key, title, children }]} />" />
      </Section>

      <Section title="Quantity Stepper" description="Beveled +/- buttons with center display.">
        <DTQuantityStepper value={stepperValue} onChange={setStepperValue} min={0} max={10} />
        <CodeLabel text="<DTQuantityStepper value onChange min max />" />
      </Section>

      <Section title="Filter Header" description="Thick top border accent. Active state switches to secondary color.">
        <div style={{ maxWidth: 400 }}>
          <button className="dt-filter-header" type="button">FILTER CATEGORY</button>
          <button className="dt-filter-header active" type="button">ACTIVE FILTER</button>
        </div>
        <CodeLabel text=".dt-filter-header | .dt-filter-header.active" />
      </Section>

      <Section title="Menu Items" description="Beveled filter menu items with active state and level indentation.">
        <div style={{ maxWidth: 300 }}>
          {['All Products', 'NFC Implants', 'RFID Tags', 'Accessories', 'Lab Products'].map((name, i) => (
            <button
              key={name}
              className={`dt-menu-item${i === 0 ? ' active' : ''}${i === 4 ? ' mode-warning' : ''}`}
              style={(i === 2 || i === 3) ? { '--dt-menu-level': '1' } as React.CSSProperties : undefined}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
        <CodeLabel text=".dt-menu-item | .active | --dt-menu-level: 1" />
      </Section>
    </>
  );
}
