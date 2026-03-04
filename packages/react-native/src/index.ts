/**
 * @anthropic-dangerous-things/react-native-theme
 *
 * Dangerous Things design system for React Native with React Native Paper.
 * Cyberpunk aesthetic with high-contrast neon colors.
 */

// Theme exports
export { DTColors, getColor } from './theme/colors';
export type { DTColorKey } from './theme/colors';

export {
  DTTypography,
  DTFonts,
  DTFontWeights,
} from './theme/typography';
export type { DTTypographyKey } from './theme/typography';

export {
  DTDarkTheme,
  DTExtendedDarkTheme,
  usePaperTheme,
} from './theme/paperTheme';
export type { DTExtendedTheme } from './theme/paperTheme';

export { DTThemeProvider, useDTTheme } from './theme/DTThemeProvider';

// Shared utilities
export type { DTVariant } from './utils/variantColors';
export { getVariantColor } from './utils/variantColors';
export { buildBeveledRectPath } from './utils/bevelPaths';
export { useComponentLayout } from './utils/useComponentLayout';

// Component exports — existing
export { DTCard, DTCardClipPath } from './components/DTCard';
export { DTButton } from './components/DTButton';
export { DTChip } from './components/DTChip';
export { DTLabel, DTLabelClipPath } from './components/DTLabel';

// Component exports — form primitives
export { DTTextInput } from './components/DTTextInput';
export { DTCheckbox } from './components/DTCheckbox';
export { DTSwitch } from './components/DTSwitch';
export { DTRadioGroup, DTRadioOption } from './components/DTRadioGroup';
export { DTQuantityStepper } from './components/DTQuantityStepper';

// Component exports — layout & containers
export { DTProgressBar } from './components/DTProgressBar';
export { DTMediaFrame } from './components/DTMediaFrame';
export { DTAccordion } from './components/DTAccordion';
export type { DTAccordionSection } from './components/DTAccordion';

// Component exports — complex interactive
export { DTModal } from './components/DTModal';
export { DTDrawer } from './components/DTDrawer';
export { DTGallery } from './components/DTGallery';
export type { DTGalleryItem } from './components/DTGallery';
export { DTSearchInput } from './components/DTSearchInput';

// Component exports — navigation & decorative
export { DTMenu, DTMenuDropdown } from './components/DTMenu';
export type { DTMenuItem } from './components/DTMenu';
export { DTHexagon } from './components/DTHexagon';

// Re-export commonly used Paper components for convenience
export {
  Text,
  Surface,
  IconButton,
  ActivityIndicator,
  Divider,
  List,
  Portal,
  Modal,
  Snackbar,
  TextInput,
} from 'react-native-paper';
