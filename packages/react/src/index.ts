/**
 * @dangerousthings/react
 *
 * React web components for the Dangerous Things design system.
 * Wraps @dangerousthings/web CSS classes with React component APIs
 * matching @dangerousthings/react-native for cross-platform parity.
 */

// Theme
export { DTWebThemeProvider } from './components/DTWebThemeProvider';
export { useDTWebTheme } from './hooks/useDTWebTheme';

// Types (re-exported from tokens for convenience)
export type { DTVariant, ThemeBrand, ThemeMode } from '@dangerousthings/tokens';
export { variantToClassName, variantToCSSProperty } from '@dangerousthings/tokens';

// Utilities
export { cx } from './utils/cx';
export { getVariantClass, featureStateToVariant, variantToBadgeClass } from './utils/variantClasses';

// Hooks
export { useScaleIn } from './hooks/useScaleIn';
export { usePulse } from './hooks/usePulse';

// Components — bevel & layout
export { DTCard } from './components/DTCard';
export { DTButton } from './components/DTButton';
export { DTLabel } from './components/DTLabel';
export { DTChip } from './components/DTChip';
export { DTMediaFrame } from './components/DTMediaFrame';
export { DTModal } from './components/DTModal';
export { DTDrawer } from './components/DTDrawer';

// Components — forms
export { DTTextInput } from './components/DTTextInput';
export { DTCheckbox } from './components/DTCheckbox';
export { DTSwitch } from './components/DTSwitch';
export { DTRadioGroup } from './components/DTRadioGroup';
export type { DTRadioOption } from './components/DTRadioGroup';
export { DTQuantityStepper } from './components/DTQuantityStepper';
export { DTSearchInput } from './components/DTSearchInput';

// Components — layout & animation
export { DTProgressBar } from './components/DTProgressBar';
export { DTAccordion } from './components/DTAccordion';
export type { DTAccordionSection } from './components/DTAccordion';
export { DTStaggerContainer } from './components/DTStaggerContainer';
export { DTBadgeOverlay } from './components/DTBadgeOverlay';

// Components — filter & feature
export { DTMenu } from './components/DTMenu';
export type { DTMenuItem } from './components/DTMenu';
export { DTFeatureLegend } from './components/DTFeatureLegend';
export type { DTFeatureItem } from './components/DTFeatureLegend';
export { DTMobileFilterOverlay } from './components/DTMobileFilterOverlay';

// Components — media & decorative
export { DTGallery } from './components/DTGallery';
export type { DTGalleryItem } from './components/DTGallery';
export { DTHexagon } from './components/DTHexagon';
