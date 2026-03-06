import { createElement, useState, type CSSProperties } from 'react';
import {
  DTCard,
  DTStaggerContainer,
  DTFeatureLegend,
} from '@dangerousthings/react';
import type { DTFeatureItem } from '@dangerousthings/react';
import type { DTVariant } from '@dangerousthings/tokens';
import { Section, CodeLabel } from '../components/Section';

// Feature icons from dt-shopify-storefront
import {
  MdOutlinePhonelinkRing,
  MdOutlineVpnKey,
  MdOutlineMobileScreenShare,
  MdOutlineCreditCard,
  MdOutlineCopyAll,
  MdOutlineLightbulb,
  MdOutlineThermostat,
  MdOutlineSensors,
  MdOutlineFitbit,
  MdOutlineVibration,
  MdOutlineExplore,
  MdLightbulbOutline,
  MdOutlineVisibility,
} from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { LuBinary } from 'react-icons/lu';

const modes: DTVariant[] = ['normal', 'emphasis', 'warning', 'success', 'other'];

// Wrap react-icons to avoid IconType/ReactNode type mismatch
const ico = (C: any) => createElement(C, { style: { fontSize: '2rem' } });

// Full chip feature legend (9 features — from storefront UseCaseLegend)
const chipFeatures: DTFeatureItem[] = [
  { key: 'smartphone', name: 'Smartphone', icon: ico(MdOutlinePhonelinkRing), state: 'supported' },
  { key: 'access_control', name: 'Access Control', icon: ico(MdOutlineVpnKey), state: 'supported' },
  { key: 'digital_security', name: 'Digital Security', icon: ico(FaUserShield), state: 'supported' },
  { key: 'cryptography', name: 'Cryptography', icon: ico(LuBinary), state: 'unsupported' },
  { key: 'data_sharing', name: 'Data Sharing', icon: ico(MdOutlineMobileScreenShare), state: 'supported' },
  { key: 'payment', name: 'Payment', icon: ico(MdOutlineCreditCard), state: 'disabled' },
  { key: 'magic', name: 'UID Magic', icon: ico(MdOutlineCopyAll), state: 'supported' },
  { key: 'illumination', name: 'Illumination', icon: ico(MdOutlineLightbulb), state: 'unsupported' },
  { key: 'temperature', name: 'Temperature', icon: ico(MdOutlineThermostat), state: 'unsupported' },
];

// Full biomagnet feature legend (4 features — from storefront MagnetUseCaseLegend)
const magnetFeatures: DTFeatureItem[] = [
  { key: 'sensing', name: 'Sensing', icon: ico(MdOutlineSensors), state: 'supported' },
  { key: 'lifting', name: 'Lifting', icon: ico(MdOutlineFitbit), state: 'supported' },
  { key: 'haptics', name: 'Haptics', icon: ico(MdOutlineVibration), state: 'supported' },
  { key: 'polarity', name: 'Polarity Detection', icon: ico(MdOutlineExplore), state: 'unsupported' },
];

// Full aesthetic feature legend (2 features — from storefront AestheticUseCaseLegend)
const aestheticFeatures: DTFeatureItem[] = [
  { key: 'illumination', name: 'Illumination', icon: ico(MdLightbulbOutline), state: 'supported' },
  { key: 'prominence', name: 'Prominence', icon: ico(MdOutlineVisibility), state: 'supported' },
];

export function CardsAdvancedPage() {
  const [staggerKey, setStaggerKey] = useState(0);

  return (
    <>
      <h1 className="page-title">Advanced Cards</h1>
      <p className="page-subtitle">Card color modes, progress bars, badge overlays, and interactive bevel buttons.</p>

      <Section title="Card Color Modes" description="Per-card color via variant prop. Sets --dt-card-color, glow color, and accent.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-dt-3">
          {modes.map(mode => (
            <DTCard key={mode} variant={mode} title={mode.toUpperCase()}>
              <div className="card-body" style={{ fontSize: '0.8rem' }}>mode-{mode}</div>
            </DTCard>
          ))}
        </div>
        <CodeLabel text="<DTCard variant='normal'> | 'emphasis' | 'warning' | 'success' | 'other'" />
      </Section>


      <Section title="Card Progress Bar" description="Vertical left-edge bar driven by progress prop (0-100).">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-dt-3">
          {[0, 25, 50, 75, 100].map((val, i) => (
            <DTCard key={val} variant={modes[i % modes.length]} title={`${val}%`} progress={val}>
              <div className="card-body" style={{ fontSize: '0.8rem' }}>Progress: {val}%</div>
            </DTCard>
          ))}
        </div>
        <CodeLabel text="<DTCard progress={50} /> — height driven by --dt-card-progress" />
      </Section>

      <Section title="Card Badges" description="Bottom-right chip badge on card product image area. Inherits card mode color.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-dt-4">
          {[
            { label: 'LAB', mode: 'warning' as DTVariant, img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop' },
            { label: 'BUNDLE', mode: 'other' as DTVariant, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop' },
            { label: 'NFC', mode: 'normal' as DTVariant, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop' },
          ].map(badge => (
            <DTCard key={badge.label} variant={badge.mode} title={badge.label + ' PRODUCT'}>
              <div className="card-body-flush dt-badge-parent" style={{ aspectRatio: '1' }}>
                <img src={badge.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <span className="dt-card-badge">{badge.label}</span>
              </div>
            </DTCard>
          ))}
        </div>
        <CodeLabel text=".dt-badge-parent > .dt-card-badge — badge positioned on card image container" />
      </Section>

<Section title="Buttons" description="Beveled buttons with active/selected states, mode colors, and level indentation.">
        <div style={{ maxWidth: 300 }}>
          {['All Products', 'NFC Implants', 'RFID Tags', 'Accessories', 'Lab Products'].map((item, i) => (
            <button
              key={item}
              className={`dt-menu-item${i === 0 ? ' active' : ''}${i === 4 ? ' mode-warning' : ''}`}
              style={i > 1 && i < 4 ? { '--dt-menu-level': '1' } as CSSProperties : undefined}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <CodeLabel text=".dt-menu-item | .dt-menu-item.active | --dt-menu-level: 1" />
      </Section>

      <Section title="Feature Legends" description="Product feature grids from the storefront. Icons indicate feature capabilities; color indicates state.">
        <DTFeatureLegend features={chipFeatures} title="NFC CHIP FEATURES" variant="normal" columns={5} />
        <div style={{ height: 'var(--space-6)' }} />
        <DTFeatureLegend features={magnetFeatures} title="BIOMAGNET FEATURES" variant="emphasis" columns={4} />
        <div style={{ height: 'var(--space-6)' }} />
        <DTFeatureLegend features={aestheticFeatures} title="AESTHETIC FEATURES" variant="other" columns={2} />
        <div style={{ height: 'var(--space-4)' }} />
        <CodeLabel text="<DTFeatureLegend features={chipFeatures} title='NFC CHIP FEATURES' variant='normal' />" />
        <CodeLabel text="<DTFeatureLegend features={magnetFeatures} variant='emphasis' columns={4} />" />
        <CodeLabel text="<DTFeatureLegend features={aestheticFeatures} variant='other' columns={2} />" />
        <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-4)', fontSize: '0.75rem' }}>
          <span><span style={{ color: 'var(--mode-normal)' }}>●</span> Supported</span>
          <span><span style={{ color: 'var(--mode-emphasis)' }}>●</span> Disabled</span>
          <span><span style={{ color: 'var(--mode-warning)' }}>●</span> Unsupported</span>
        </div>
      </Section>

      <Section title="Stagger + Modes" description="Mode-colored cards in a stagger container.">
        <DTStaggerContainer
          key={staggerKey}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-dt-3"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <DTCard key={i} variant={modes[i % modes.length]} title={modes[i % modes.length].toUpperCase()} style={{ textAlign: 'center' }}>
              {null}
            </DTCard>
          ))}
        </DTStaggerContainer>
        <button
          className="btn-secondary"
          style={{ marginTop: 'var(--space-4)' }}
          onClick={() => setStaggerKey(k => k + 1)}
          type="button"
        >
          REPLAY
        </button>
        <CodeLabel text="<DTStaggerContainer> with <DTCard variant='...' />" />
      </Section>
    </>
  );
}
