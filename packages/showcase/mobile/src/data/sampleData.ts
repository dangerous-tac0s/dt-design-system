export const galleryItems = [
  { id: '1', uri: 'https://picsum.photos/seed/dt-gallery1/800/800', alt: 'Sample image 1' },
  { id: '2', uri: 'https://picsum.photos/seed/dt-gallery2/800/800', alt: 'Sample image 2' },
  { id: '3', uri: 'https://picsum.photos/seed/dt-gallery3/800/800', alt: 'Sample image 3' },
  { id: '4', uri: 'https://picsum.photos/seed/dt-gallery4/800/800', alt: 'Sample image 4' },
  { id: '5', uri: 'https://picsum.photos/seed/dt-gallery5/800/800', alt: 'Sample image 5' },
];

export const menuItems = [
  {
    id: 'home',
    title: 'Home',
    isActive: true,
    onPress: () => {},
  },
  {
    id: 'products',
    title: 'Products',
    items: [
      { id: 'nfc', title: 'NFC Implants', onPress: () => {} },
      { id: 'rfid', title: 'RFID Implants', onPress: () => {} },
      {
        id: 'accessories',
        title: 'Accessories',
        items: [
          { id: 'readers', title: 'Readers', onPress: () => {} },
          { id: 'tools', title: 'Tools', onPress: () => {} },
        ],
      },
    ],
  },
  { id: 'about', title: 'About', onPress: () => {} },
  { id: 'contact', title: 'Contact', onPress: () => {} },
];

export const horizontalMenuItems = [
  { id: 'h1', title: 'Home', onPress: () => {}, isActive: true },
  { id: 'h2', title: 'Shop', onPress: () => {} },
  { id: 'h3', title: 'Blog', onPress: () => {} },
  { id: 'h4', title: 'FAQ', onPress: () => {} },
];

export const dropdownItems = [
  { id: 'd1', title: 'Edit', onPress: () => {} },
  { id: 'd2', title: 'Duplicate', onPress: () => {} },
  { id: 'd3', title: 'Archive', onPress: () => {} },
  { id: 'd4', title: 'Delete', onPress: () => {} },
];

export const featureLegendItems = [
  { key: 'payment', name: 'Payment', icon: null, state: 'supported' as const },
  { key: 'access', name: 'Access', icon: null, state: 'supported' as const },
  { key: 'clone', name: 'Clone', icon: null, state: 'disabled' as const },
  { key: 'crypto', name: 'Crypto', icon: null, state: 'unsupported' as const },
  { key: 'sensing', name: 'Sensing', icon: null, state: 'supported' as const },
  { key: 'temp', name: 'Temp', icon: null, state: 'supported' as const },
  { key: 'fitness', name: 'Fitness', icon: null, state: 'disabled' as const },
  { key: 'explore', name: 'Explore', icon: null, state: 'supported' as const },
  { key: 'vibration', name: 'Vibration', icon: null, state: 'unsupported' as const },
  { key: 'sharing', name: 'Sharing', icon: null, state: 'supported' as const },
];
