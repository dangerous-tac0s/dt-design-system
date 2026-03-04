import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  DTTextInput,
  DTCheckbox,
  DTSwitch,
  DTRadioGroup,
  DTRadioOption,
  DTQuantityStepper,
  useDTTheme,
} from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';

export function FormsScreen() {
  const theme = useDTTheme();

  // TextInput state
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const [errorField, setErrorField] = useState('');

  // Checkbox state
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(false);

  // Switch state
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);

  // Radio state
  const [radio1, setRadio1] = useState<string | null>('nfc');
  const [radio2, setRadio2] = useState<string | null>(null);

  // Stepper state
  const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(5);
  const [qty3, setQty3] = useState(0);

  return (
    <ScreenContainer>
      {/* DTTextInput */}
      <DemoSection
        title="DTTextInput"
        variant="normal"
        description="Angular text input wrapping RNP TextInput. Focus glow bar animation."
      >
        <View style={{ gap: 16 }}>
          <View>
            <DTTextInput
              variant="normal"
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
            <CodeLabel text='variant="normal"' />
          </View>

          <View>
            <DTTextInput
              variant="emphasis"
              label="Search Query"
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
            />
            <CodeLabel text='variant="emphasis"' />
          </View>

          <View>
            <DTTextInput
              variant="warning"
              error
              errorMessage="This field is required"
              label="Email"
              value={errorField}
              onChangeText={setErrorField}
              placeholder="user@example.com"
            />
            <CodeLabel text='error={true} errorMessage="..."' />
          </View>

          <View>
            <DTTextInput
              variant="success"
              label="Verified Field"
              value="verified@example.com"
              onChangeText={() => {}}
            />
            <CodeLabel text='variant="success"' />
          </View>
        </View>
      </DemoSection>

      {/* DTCheckbox */}
      <DemoSection
        title="DTCheckbox"
        variant="normal"
        description="Angular square checkbox with SVG checkmark. Custom-built (RNP uses rounded)."
      >
        <View style={{ gap: 4 }}>
          <DTCheckbox
            checked={check1}
            onPress={() => setCheck1(!check1)}
            label="Accept terms and conditions"
            variant="normal"
          />
          <DTCheckbox
            checked={check2}
            onPress={() => setCheck2(!check2)}
            label="Remember me"
            variant="success"
          />
          <DTCheckbox
            checked={check3}
            onPress={() => setCheck3(!check3)}
            label="Enable notifications"
            variant="emphasis"
          />
          <DTCheckbox
            checked={true}
            onPress={() => {}}
            label="Disabled checked"
            variant="normal"
            disabled
          />
          <DTCheckbox
            checked={false}
            onPress={() => {}}
            label="Disabled unchecked"
            variant="normal"
            disabled
          />
          <DTCheckbox
            checked={true}
            onPress={() => {}}
            label="Large checkbox (size=32)"
            variant="warning"
            size={32}
          />
        </View>
      </DemoSection>

      {/* DTSwitch */}
      <DemoSection
        title="DTSwitch"
        variant="normal"
        description="Angular toggle switch. Custom-built with animated thumb."
      >
        <View style={{ gap: 4 }}>
          <DTSwitch
            value={switch1}
            onValueChange={setSwitch1}
            label="Enable NFC"
            variant="normal"
          />
          <DTSwitch
            value={switch2}
            onValueChange={setSwitch2}
            label="Auto-detect"
            variant="success"
          />
          <DTSwitch
            value={switch3}
            onValueChange={setSwitch3}
            label="Dark mode"
            variant="emphasis"
          />
          <DTSwitch
            value={true}
            onValueChange={() => {}}
            label="Disabled (on)"
            variant="normal"
            disabled
          />
          <DTSwitch
            value={false}
            onValueChange={() => {}}
            label="Disabled (off)"
            variant="normal"
            disabled
          />
        </View>
      </DemoSection>

      {/* DTRadioGroup */}
      <DemoSection
        title="DTRadioGroup"
        variant="normal"
        description="Angular square radio indicators with selection highlight."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          BASIC:
        </Text>
        <DTRadioGroup value={radio1} onValueChange={setRadio1} variant="normal">
          <DTRadioOption value="nfc" label="NFC (Near Field Communication)" />
          <DTRadioOption value="rfid" label="RFID (Radio Frequency ID)" />
          <DTRadioOption value="ble" label="BLE (Bluetooth Low Energy)" />
        </DTRadioGroup>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 24, marginBottom: 8 }}>
          WITH DESCRIPTIONS:
        </Text>
        <DTRadioGroup value={radio2} onValueChange={setRadio2} variant="emphasis">
          <DTRadioOption
            value="xNT"
            label="xNT"
            description="NTAG216 implant, 888 bytes, NFC Type 2"
          />
          <DTRadioOption
            value="xDF2"
            label="xDF2"
            description="DESFire EV2 implant, 8K bytes, NFC Type 4"
          />
          <DTRadioOption
            value="xEM"
            label="xEM"
            description="T5577 implant, LF 125kHz"
            disabled
          />
        </DTRadioGroup>
      </DemoSection>

      {/* DTQuantityStepper */}
      <DemoSection
        title="DTQuantityStepper"
        variant="emphasis"
        description="Increment/decrement with beveled +/- buttons."
      >
        <View style={{ gap: 24 }}>
          <View>
            <DTQuantityStepper
              value={qty1}
              onValueChange={setQty1}
              label="Quantity"
              min={1}
              max={10}
              variant="normal"
              size="medium"
            />
            <CodeLabel text='size="medium" min={1} max={10}' />
          </View>

          <View>
            <DTQuantityStepper
              value={qty2}
              onValueChange={setQty2}
              label="Small Stepper"
              min={0}
              max={99}
              variant="emphasis"
              size="small"
            />
            <CodeLabel text='size="small" min={0} max={99}' />
          </View>

          <View>
            <DTQuantityStepper
              value={qty3}
              onValueChange={setQty3}
              label="Large Stepper"
              min={0}
              max={20}
              step={5}
              variant="success"
              size="large"
            />
            <CodeLabel text='size="large" step={5}' />
          </View>

          <View>
            <DTQuantityStepper
              value={3}
              onValueChange={() => {}}
              label="Disabled"
              variant="normal"
              disabled
            />
            <CodeLabel text="disabled={true}" />
          </View>
        </View>
      </DemoSection>
    </ScreenContainer>
  );
}
