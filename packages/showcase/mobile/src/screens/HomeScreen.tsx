import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DTCard, DTHexagon, useDTTheme } from '@dangerousthings/react-native';
import type { DTVariant } from '@dangerousthings/react-native';
import type { RootStackParamList } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { BrandSwitcher } from '../components/BrandSwitcher';
import { useBrand } from '../brand/BrandContext';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const categories: {
  title: string;
  subtitle: string;
  mode: DTVariant;
  route: keyof RootStackParamList;
  count: number;
}[] = [
  {
    title: 'BUTTONS & ACTIONS',
    subtitle: 'DTButton, DTChip, DTHexagon',
    mode: 'normal',
    route: 'Buttons',
    count: 3,
  },
  {
    title: 'CARDS & LABELS',
    subtitle: 'DTCard, DTLabel, DTMediaFrame',
    mode: 'emphasis',
    route: 'Cards',
    count: 3,
  },
  {
    title: 'FORM CONTROLS',
    subtitle: 'DTTextInput, DTCheckbox, DTSwitch, DTRadioGroup, DTQuantityStepper',
    mode: 'success',
    route: 'Forms',
    count: 5,
  },
  {
    title: 'PROGRESS & FEEDBACK',
    subtitle: 'DTProgressBar, DTSearchInput',
    mode: 'other',
    route: 'Feedback',
    count: 2,
  },
  {
    title: 'OVERLAYS & NAVIGATION',
    subtitle: 'DTModal, DTDrawer, DTAccordion, DTMenu, DTGallery',
    mode: 'warning',
    route: 'Overlays',
    count: 5,
  },
  {
    title: 'ADVANCED CARDS',
    subtitle: 'Selected state, progress bar, badge overlays',
    mode: 'emphasis',
    route: 'CardsAdvanced',
    count: 4,
  },
  {
    title: 'ANIMATIONS',
    subtitle: 'useScaleIn, usePulse',
    mode: 'success',
    route: 'Animations',
    count: 3,
  },
  {
    title: 'FILTERS & FEATURES',
    subtitle: 'DTFeatureLegend, DTMobileFilterOverlay',
    mode: 'other',
    route: 'Filters',
    count: 2,
  },
  {
    title: 'THEME REFERENCE',
    subtitle: 'Colors, Typography, Spacing',
    mode: 'normal',
    route: 'Theme',
    count: 0,
  },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useDTTheme();
  const { brand } = useBrand();

  return (
    <ScreenContainer style={{ paddingTop: insets.top + 24 }}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={[styles.title, { color: theme.custom.modeNormal }]}>
          DANGEROUS THINGS
        </Text>
        <Text variant="headlineSmall" style={[styles.subtitle, { color: theme.custom.modeEmphasis }]}>
          DESIGN SYSTEM
        </Text>
        <Text variant="bodySmall" style={styles.version}>
          {brand.name} theme
        </Text>
      </View>

      <BrandSwitcher />

      <View style={styles.hexRow}>
        <DTHexagon size={18} variant="normal" opacity={0.4} />
        <DTHexagon size={18} variant="emphasis" opacity={0.6} />
        <DTHexagon size={18} variant="warning" opacity={0.4} />
        <DTHexagon size={18} variant="success" opacity={0.6} />
        <DTHexagon size={18} variant="other" opacity={0.4} />
      </View>

      <Text variant="labelSmall" style={styles.sectionLabel}>
        COMPONENT CATALOG
      </Text>

      {categories.map((cat) => (
        <DTCard
          key={cat.route}
          mode={cat.mode}
          title={cat.title}
          onPress={() => navigation.navigate(cat.route)}
          style={styles.card}
        >
          <Text variant="bodySmall" style={styles.cardSubtitle}>
            {cat.subtitle}
          </Text>
          {cat.count > 0 && (
            <Text variant="labelSmall" style={styles.cardCount}>
              {cat.count} components
            </Text>
          )}
        </DTCard>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    letterSpacing: 2,
  },
  subtitle: {
    letterSpacing: 3,
    marginTop: 4,
  },
  version: {
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
  hexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 24,
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
  },
  cardCount: {
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
});
