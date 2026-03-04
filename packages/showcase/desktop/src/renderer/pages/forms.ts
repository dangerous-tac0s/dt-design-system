import { el, section, row, label, codeLabel } from '../utils/dom';

export function renderFormsPage(container: HTMLElement) {
  container.appendChild(el('h1', { className: 'page-title' }, 'Forms'));
  container.appendChild(el('p', { className: 'page-subtitle' }, 'DT-branded form components. Angular styling with focus effects.'));

  // Text Inputs
  const normalInput = el('input', { type: 'text', placeholder: 'Normal input — click to focus', style: 'max-width: 400px;' }) as HTMLInputElement;
  const errorInput = el('input', { type: 'text', className: 'error', placeholder: 'Error state input', style: 'max-width: 400px;' }) as HTMLInputElement;
  const textarea = el('textarea', { placeholder: 'Textarea element', style: 'max-width: 400px; min-height: 80px;' }) as HTMLTextAreaElement;

  container.appendChild(
    section('Text Input', 'Sharp corners + focus glow bar. 2px solid border, no border-radius.',
      normalInput,
      codeLabel('input[type="text"] — focus glow bar on [data-brand="dt"]'),
      el('br'),
      errorInput,
      codeLabel('input.error — red focus bar on [data-brand="dt"]'),
      el('br'),
      textarea,
      codeLabel('textarea — same styling'),
    ),
  );

  // Checkboxes
  function checkbox(labelText: string, checked: boolean, disabled = false): HTMLElement {
    const wrapper = el('label', { style: 'display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 4px 0;' });
    const input = document.createElement('input');
    input.type = 'checkbox';
    if (checked) input.checked = true;
    if (disabled) input.disabled = true;
    wrapper.appendChild(input);
    wrapper.appendChild(el('span', {}, labelText));
    return wrapper;
  }

  container.appendChild(
    section('Checkbox', 'Beveled hexagon shape via clip-path. 30% corner cuts.',
      checkbox('Unchecked checkbox', false),
      checkbox('Checked checkbox', true),
      checkbox('Disabled checked', true, true),
      checkbox('Disabled unchecked', false, true),
      codeLabel('input[type="checkbox"] — hex bevel on [data-brand="dt"]'),
    ),
  );

  // Switch / Toggle
  function switchEl(labelText: string, checked: boolean, disabled = false): HTMLElement {
    const wrapper = el('div', { style: 'display: flex; align-items: center; gap: 12px; margin-bottom: 8px;' });
    const sw = el('label', { className: 'dt-switch' });
    const input = document.createElement('input');
    input.type = 'checkbox';
    if (checked) input.checked = true;
    if (disabled) input.disabled = true;
    sw.appendChild(input);
    sw.appendChild(el('div', { className: 'dt-switch-track' }));
    sw.appendChild(el('div', { className: 'dt-switch-thumb' }));
    wrapper.appendChild(sw);
    wrapper.appendChild(el('span', {}, labelText));
    return wrapper;
  }

  container.appendChild(
    section('Switch / Toggle', 'Angular track + sliding square thumb. 48x26 track, 20x20 thumb.',
      switchEl('Off', false),
      switchEl('On', true),
      switchEl('Disabled (on)', true, true),
      switchEl('Disabled (off)', false, true),
      codeLabel('.dt-switch > input + .dt-switch-track + .dt-switch-thumb'),
    ),
  );

  // Radio Buttons
  function radioGroup(name: string, options: { value: string; label: string; checked?: boolean; disabled?: boolean }[]): HTMLElement {
    const group = el('div', { style: 'display: flex; flex-direction: column; gap: 4px;' });
    for (const opt of options) {
      const wrapper = el('label', { className: `dt-radio-option${opt.checked ? ' selected' : ''}`, style: 'cursor: pointer;' });
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.value = opt.value;
      if (opt.checked) input.checked = true;
      if (opt.disabled) input.disabled = true;

      input.addEventListener('change', () => {
        group.querySelectorAll('.dt-radio-option').forEach((o) => o.classList.remove('selected'));
        if (input.checked) wrapper.classList.add('selected');
      });

      wrapper.appendChild(input);
      wrapper.appendChild(el('span', {}, opt.label));
      group.appendChild(wrapper);
    }
    return group;
  }

  container.appendChild(
    section('Radio Button', 'Hexagonal indicator via clip-path. Flat-top hexagon shape.',
      radioGroup('demo-radio', [
        { value: 'nfc', label: 'NFC (Near Field Communication)', checked: true },
        { value: 'rfid', label: 'RFID (Radio Frequency ID)' },
        { value: 'ble', label: 'BLE (Bluetooth Low Energy)' },
      ]),
      codeLabel('input[type="radio"] — hex indicator on [data-brand="dt"]'),
    ),
  );

  // Progress Bar
  function progressBar(value: number, showLabel = false): HTMLElement {
    const wrapper = el('div');
    const bar = el('div', { className: 'dt-progress' });
    const fill = el('div', { className: 'dt-progress-fill', style: `width: ${value * 100}%;` });
    bar.appendChild(fill);
    wrapper.appendChild(bar);
    if (showLabel) {
      wrapper.appendChild(el('div', { className: 'dt-progress-label' }, `${Math.round(value * 100)}%`));
    }
    return wrapper;
  }

  container.appendChild(
    section('Progress Bar', 'Angular, no border-radius. 4px default height.',
      label('25%'),
      progressBar(0.25),
      label('50% WITH LABEL'),
      progressBar(0.5, true),
      label('75%'),
      progressBar(0.75),
      label('100%'),
      progressBar(1.0, true),
      codeLabel('.dt-progress > .dt-progress-fill'),
    ),
  );

  // Accordion
  function accordion(items: { title: string; content: string }[]): HTMLElement {
    const acc = el('div', { className: 'dt-accordion' });
    for (const item of items) {
      const header = el('button', { className: 'dt-accordion-header', 'aria-expanded': 'false' });
      header.appendChild(document.createTextNode(item.title));
      header.appendChild(el('span', { className: 'dt-accordion-chevron' }));

      const content = el('div', { className: 'dt-accordion-content', 'data-open': 'false' });
      content.appendChild(el('div', { style: 'padding: var(--space-4);' }, item.content));

      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', String(!expanded));
        content.setAttribute('data-open', String(!expanded));
      });

      acc.appendChild(header);
      acc.appendChild(content);
    }
    return acc;
  }

  container.appendChild(
    section('Accordion', 'Click headers to expand. 5px top border, chevron rotation.',
      accordion([
        { title: 'Size', content: 'Small, Medium, Large options available.' },
        { title: 'Chip Type', content: 'NTAG, DESFire, MIFARE Classic.' },
        { title: 'Frequency', content: '13.56 MHz (HF), 125 kHz (LF).' },
      ]),
      codeLabel('.dt-accordion > .dt-accordion-header + .dt-accordion-content'),
    ),
  );

  // Quantity Stepper
  function stepper(initialValue: number, min: number, max: number): HTMLElement {
    let value = initialValue;
    const wrapper = el('div', { className: 'dt-stepper' });
    const minusBtn = el('button', { className: 'dt-stepper-btn' }, '\u2212') as HTMLButtonElement;
    const valueEl = el('span', { className: 'dt-stepper-value' }, String(value));
    const plusBtn = el('button', { className: 'dt-stepper-btn' }, '+') as HTMLButtonElement;

    function update() {
      valueEl.textContent = String(value);
      minusBtn.disabled = value <= min;
      plusBtn.disabled = value >= max;
    }

    minusBtn.addEventListener('click', () => { value = Math.max(min, value - 1); update(); });
    plusBtn.addEventListener('click', () => { value = Math.min(max, value + 1); update(); });

    wrapper.appendChild(minusBtn);
    wrapper.appendChild(valueEl);
    wrapper.appendChild(plusBtn);
    update();
    return wrapper;
  }

  container.appendChild(
    section('Quantity Stepper', 'Beveled +/- buttons with center display.',
      stepper(1, 0, 10),
      codeLabel('.dt-stepper > .dt-stepper-btn + .dt-stepper-value + .dt-stepper-btn'),
    ),
  );
}
