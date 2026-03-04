import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  DTButton,
  DTCard,
  DTChip,
  DTModal,
  DTDrawer,
  DTAccordion,
  DTMenu,
  DTMenuDropdown,
  DTGallery,
  useDTTheme,
} from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';
import { galleryItems, menuItems, horizontalMenuItems, dropdownItems } from '../data/sampleData';

export function OverlaysScreen() {
  const theme = useDTTheme();

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  // Drawer state
  const [rightDrawer, setRightDrawer] = useState(false);
  const [leftDrawer, setLeftDrawer] = useState(false);

  // Menu dropdown state
  const [menuDropdownVisible, setMenuDropdownVisible] = useState(false);

  // Gallery state
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <ScreenContainer>
      {/* DTModal */}
      <DemoSection
        title="DTModal"
        variant="normal"
        description="Wraps RNP Portal + Modal. Content rendered inside DTCard."
      >
        <View style={{ gap: 12 }}>
          <DTButton variant="normal" onPress={() => setModalVisible(true)}>
            OPEN NORMAL MODAL
          </DTButton>
          <DTButton variant="warning" onPress={() => setWarningModalVisible(true)}>
            OPEN WARNING MODAL
          </DTButton>
        </View>

        <DTModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          title="CONFIRM ACTION"
          variant="normal"
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
            Are you sure you want to proceed with this action?
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <DTButton
              variant="normal"
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={{ flex: 1 }}
            >
              CONFIRM
            </DTButton>
            <DTButton
              variant="normal"
              onPress={() => setModalVisible(false)}
              style={{ flex: 1 }}
            >
              CANCEL
            </DTButton>
          </View>
        </DTModal>

        <DTModal
          visible={warningModalVisible}
          onDismiss={() => setWarningModalVisible(false)}
          title="DELETE ITEM"
          variant="warning"
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
            This action cannot be undone. All data will be permanently removed.
          </Text>
          <DTButton
            variant="warning"
            mode="contained"
            onPress={() => setWarningModalVisible(false)}
          >
            DELETE
          </DTButton>
        </DTModal>
      </DemoSection>

      {/* DTDrawer */}
      <DemoSection
        title="DTDrawer"
        variant="emphasis"
        description="Sliding panel via Portal + Animated. Beveled leading edge."
      >
        <View style={{ gap: 12 }}>
          <DTButton variant="emphasis" onPress={() => setRightDrawer(true)}>
            OPEN RIGHT DRAWER
          </DTButton>
          <DTButton variant="normal" onPress={() => setLeftDrawer(true)}>
            OPEN LEFT DRAWER
          </DTButton>
        </View>

        <DTDrawer
          visible={rightDrawer}
          onDismiss={() => setRightDrawer(false)}
          heading="CART"
          headingVariant="emphasis"
          position="right"
        >
          <DTCard mode="normal" title="ITEM 1" style={{ marginBottom: 12 }}>
            <Text style={{ color: theme.colors.onSurface }}>xNT NFC Implant</Text>
          </DTCard>
          <DTCard mode="normal" title="ITEM 2" style={{ marginBottom: 12 }}>
            <Text style={{ color: theme.colors.onSurface }}>xDF2 DESFire Implant</Text>
          </DTCard>
          <DTButton
            variant="emphasis"
            mode="contained"
            onPress={() => setRightDrawer(false)}
          >
            CHECKOUT
          </DTButton>
        </DTDrawer>

        <DTDrawer
          visible={leftDrawer}
          onDismiss={() => setLeftDrawer(false)}
          heading="MENU"
          headingVariant="normal"
          position="left"
        >
          <View style={{ gap: 12 }}>
            <DTButton variant="normal" onPress={() => setLeftDrawer(false)}>
              HOME
            </DTButton>
            <DTButton variant="normal" onPress={() => setLeftDrawer(false)}>
              PRODUCTS
            </DTButton>
            <DTButton variant="normal" onPress={() => setLeftDrawer(false)}>
              ABOUT
            </DTButton>
            <DTButton variant="normal" onPress={() => setLeftDrawer(false)}>
              CONTACT
            </DTButton>
          </View>
        </DTDrawer>
      </DemoSection>

      {/* DTAccordion */}
      <DemoSection
        title="DTAccordion"
        variant="normal"
        description="Wraps RNP List.Accordion with angular headers and thick top border."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          SINGLE EXPAND:
        </Text>
        <DTAccordion
          variant="normal"
          activeVariant="emphasis"
          sections={[
            {
              key: 'size',
              title: 'Size',
              children: (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <DTChip variant="normal">Small</DTChip>
                  <DTChip variant="normal">Medium</DTChip>
                  <DTChip variant="normal">Large</DTChip>
                </View>
              ),
            },
            {
              key: 'type',
              title: 'Chip Type',
              children: (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <DTChip variant="emphasis">NTAG</DTChip>
                  <DTChip variant="emphasis">DESFire</DTChip>
                  <DTChip variant="emphasis">MIFARE Classic</DTChip>
                </View>
              ),
            },
            {
              key: 'freq',
              title: 'Frequency',
              children: (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <DTChip variant="success">13.56 MHz (HF)</DTChip>
                  <DTChip variant="success">125 kHz (LF)</DTChip>
                </View>
              ),
            },
          ]}
        />

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 24, marginBottom: 8 }}>
          MULTI EXPAND:
        </Text>
        <DTAccordion
          variant="other"
          activeVariant="warning"
          allowMultiple
          initialOpenKeys={['about']}
          sections={[
            {
              key: 'about',
              title: 'About',
              children: (
                <Text style={{ color: theme.colors.onSurface }}>
                  Dangerous Things makes NFC and RFID implants for human use.
                </Text>
              ),
            },
            {
              key: 'faq',
              title: 'FAQ',
              children: (
                <Text style={{ color: theme.colors.onSurface }}>
                  Frequently asked questions about biohacking and body implants.
                </Text>
              ),
            },
          ]}
        />
      </DemoSection>

      {/* DTMenu */}
      <DemoSection
        title="DTMenu"
        variant="normal"
        description="Hierarchical menu with expandable sub-items. Thick top border accent."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          VERTICAL (default):
        </Text>
        <DTMenu
          variant="normal"
          activeVariant="emphasis"
          items={menuItems}
        />

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 24, marginBottom: 8 }}>
          HORIZONTAL:
        </Text>
        <DTMenu
          variant="normal"
          layout="horizontal"
          items={horizontalMenuItems}
        />

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 24, marginBottom: 8 }}>
          DROPDOWN (DTMenuDropdown):
        </Text>
        <DTMenuDropdown
          visible={menuDropdownVisible}
          onDismiss={() => setMenuDropdownVisible(false)}
          variant="normal"
          anchor={
            <DTButton variant="normal" onPress={() => setMenuDropdownVisible(true)}>
              OPEN DROPDOWN
            </DTButton>
          }
          items={dropdownItems}
        />
      </DemoSection>

      {/* DTGallery */}
      <DemoSection
        title="DTGallery"
        variant="normal"
        description="Image gallery with thumbnail strip and arrow navigation."
      >
        <DTGallery
          items={galleryItems}
          activeIndex={galleryIndex}
          onSelect={setGalleryIndex}
          variant="normal"
          thumbnailSize={64}
        />
      </DemoSection>
    </ScreenContainer>
  );
}
