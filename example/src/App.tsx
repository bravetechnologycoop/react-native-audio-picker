import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {AudioDeviceInfo, presentAudioPicker, getAudioDeviceType, getAudioDeviceName, useBluetooth, useSpeaker, useEarpiece} from 'react-native-audio-picker';

export default function App() {
  const [audioDeviceType, setAudioDeviceType] = React.useState<string | undefined>(getAudioDeviceType());
  const [audioDeviceName, setAudioDeviceName] = React.useState<string | undefined>(getAudioDeviceName());

  React.useEffect(() => {
    setAudioDeviceType(getAudioDeviceType());
    setAudioDeviceName(getAudioDeviceName());
  });

  function audioDeviceChanged(deviceType, deviceName) {
    setAudioDeviceType(deviceType);
    setAudioDeviceName(deviceName);
  }

  // On android name will always be empty. Apologies.

  return (
    <View style={styles.container}>
      <Text>Type:{audioDeviceType}</Text>
      <Text>Name:{audioDeviceName}</Text>
      <AudioDeviceInfo onAudioDeviceChanged={audioDeviceChanged} />
      <Button onPress={presentAudioPicker} title="Present Picker" />
      <Button onPress={useBluetooth} title="Use Bluetooth" />
      <Button onPress={useSpeaker} title="Use Speaker" />
      <Button onPress={useEarpiece} title="Use Earpiece" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
