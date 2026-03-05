import type { ReactNode, CSSProperties } from 'react';

export function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="demo-section">
      <h2>{title}</h2>
      <p className="demo-description">{description}</p>
      {children}
    </div>
  );
}

export function Row({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="demo-row" style={style}>{children}</div>;
}

export function CodeLabel({ text }: { text: string }) {
  return <div className="code-label">{text}</div>;
}

export function DemoLabel({ text }: { text: string }) {
  return <div className="demo-label">{text}</div>;
}
