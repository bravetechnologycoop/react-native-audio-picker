import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {AudioDeviceInfo, presentAudioPicker, getAudioDeviceType, getAudioDeviceName} from 'react-native-audio-picker';

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

  return (
    <View style={styles.container}>
      <Text>Type:{audioDeviceType}</Text>
      <Text>Name:{audioDeviceName}</Text>
      <AudioDeviceInfo onAudioDeviceChanged={audioDeviceChanged} />
      <Button onPress={presentAudioPicker} title="Present Picker"/>
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
