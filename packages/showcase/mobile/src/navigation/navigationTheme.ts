import { DefaultTheme } from '@react-navigation/native';
import { useBrand } from '../brand/BrandContext';

export function useNavigationTheme() {
  const { brand } = useBrand();
  const colors = brand.dark;

  return {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.bg,
      card: colors.bg,
      text: colors.textPrimary,
      border: colors.primary,
      notification: colors.secondary,
    },
  };
}
