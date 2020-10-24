import { NativeModules, NativeEventEmitter } from 'react-native';
import { requireNativeComponent, ViewProps } from 'react-native';

type BRVAudioPickerMethods = {
  // TODO: Define Methods in here.
};

type BRVAudioPickerEventProps = {
  // TODO: Can this even be a type? This would be better done how it was done in react-native-audio-diagnostics.
}

const BRVAudioPicker = NativeModules.BRVAudioPicker;
const BRVAudioPickerEvents = new NativeEventEmitter(
  NativeModules.BRVAudioPickerEvents
);

type BRVAudioPickerButtonProps = ViewProps & {
  activeTintColor?: string;
  tintColor?: string;
  style?: React.CSSProperties;
};

// Right now just export the button. You can call .click() on it.
// This might the simplest approach, we are going to need some painful work getting everything exported.
export const AudioPickerButton = requireNativeComponent<BRVAudioPickerButtonProps>(
  'BRVAudioPickerButton'
);
