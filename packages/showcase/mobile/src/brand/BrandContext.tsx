import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { brands, themes } from '@dangerousthings/tokens';
import type { ThemeBrand, BrandTokens } from '@dangerousthings/tokens';
import { buildThemeFromBrand } from './buildTheme';
import type { DTExtendedTheme } from '@dangerousthings/react-native';

interface BrandContextValue {
  brandId: ThemeBrand;
  brand: BrandTokens;
  theme: DTExtendedTheme;
  setBrand: (id: ThemeBrand) => void;
  availableBrands: typeof themes;
}

const BrandContext = createContext<BrandContextValue>(null!);

export function useBrand() {
  return useContext(BrandContext);
}

interface BrandProviderProps {
  children: ReactNode;
  initialBrand?: ThemeBrand;
}

export function BrandProvider({ children, initialBrand = 'dt' }: BrandProviderProps) {
  const [brandId, setBrandId] = useState<ThemeBrand>(initialBrand);

  const value = useMemo(() => {
    const brand = brands[brandId] as BrandTokens;
    const theme = buildThemeFromBrand(brand);
    return {
      brandId,
      brand,
      theme,
      setBrand: setBrandId,
      availableBrands: themes,
    };
  }, [brandId]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}
