import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useBrand } from '../brand/BrandContext';
import type { ThemeBrand } from '@dangerousthings/tokens';

const brandLabels: Record<ThemeBrand, string> = {
  dt: 'DT',
  classic: 'CLASSIC',
};

const brandColors: Record<ThemeBrand, string> = {
  dt: '#00FFFF',
  classic: '#FF00FF',
};

export function BrandSwitcher() {
  const { brandId, setBrand, availableBrands } = useBrand();

  return (
    <View style={styles.container}>
      {availableBrands.map((def) => {
        const isActive = def.id === brandId;
        const color = brandColors[def.id];

        return (
          <Pressable
            key={def.id}
            onPress={() => setBrand(def.id)}
            style={[
              styles.chip,
              {
                borderColor: color,
                backgroundColor: isActive ? color : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isActive ? '#000000' : color },
              ]}
            >
              {brandLabels[def.id]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
