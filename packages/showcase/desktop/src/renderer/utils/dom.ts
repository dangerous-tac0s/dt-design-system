export function el(
  tag: string,
  attrs?: Record<string, string>,
  ...children: (string | HTMLElement)[]
): HTMLElement {
  const element = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

export function section(title: string, description: string, ...children: HTMLElement[]): HTMLElement {
  const container = el('div', { className: 'demo-section' });
  container.appendChild(el('h2', {}, title));
  container.appendChild(el('p', { className: 'demo-description' }, description));
  for (const child of children) {
    container.appendChild(child);
  }
  return container;
}

export function row(...children: HTMLElement[]): HTMLElement {
  return el('div', { className: 'demo-row' }, ...children);
}

export function label(text: string): HTMLElement {
  return el('div', { className: 'demo-label' }, text);
}

export function codeLabel(text: string): HTMLElement {
  return el('div', { className: 'code-label' }, text);
}
