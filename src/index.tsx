import { NativeModules, NativeEventEmitter, View, Text, Platform } from 'react-native';
import { requireNativeComponent, ViewProps } from 'react-native';
import React, { Component } from 'react';

class AudioInfo {
  private audioPicker: any;
  private audioEvents: NativeEventEmitter;
  public currentDeviceType: string;
  public currentDeviceName: string;
  private isObserving: boolean;

  constructor() {
    this.audioPicker = NativeModules.BRVAudioPicker;
    this.audioEvents = new NativeEventEmitter(NativeModules.BRVAudioPickerEvents);
    this.deviceChangedHandler(null);
    this.start();
  }

  private deviceChangedHandler = (event: any) => {
    this.audioPicker.getAudioOutput(this.audioOutputTypeHandler);
  }

  private audioOutputTypeHandler = (error: any, result: any) => {
    if (this.currentDeviceType != result["type"] || this.currentDeviceName != result["name"]) {
      this.currentDeviceType = result["type"];
      this.currentDeviceName = result["name"];
    }
  }

  presentAudioPicker = () => {
    if (Platform.OS === 'ios') {
      this.audioPicker.presentAudioPicker(() => { });
    } else {
      console.warn("Picker is not supported on this platform.");
    }
  }

  getCurrentAudioDeviceType = () => {
    return this.currentDeviceType;
  }

  getCurrentAudioDeviceName = () => {
    return this.currentDeviceName;
  }

  useSpeaker = () => {
    this.audioPicker.useSpeaker(() => { });
  }

  useEarpiece = () => {
    this.audioPicker.useEarpiece(() => { });
  }

  useBluetooth = () => {
    this.audioPicker.useBluetooth(() => { });
  }

  start() {
    if (!this.isObserving) {
      this.audioEvents.addListener("AudioDeviceChanged", this.deviceChangedHandler);
      this.isObserving = true;
    }
  }

  stop() {
    if (this.isObserving) {
      this.audioEvents.removeListener("AudioDeviceChanged", this.deviceChangedHandler);
      this.isObserving = false;
    }
  }
}

const AudioInfoInstance = new AudioInfo();

export const AudioPicker = AudioInfoInstance;
// These are mostly just for utilities sake so you don't have to import the entire 'singleton'.
// Probably not exactly as useful as I think.
export const presentAudioPicker = () => { AudioPicker.presentAudioPicker(); }
export const getAudioDeviceType = () => { return AudioPicker.getCurrentAudioDeviceType(); }
export const getAudioDeviceName = () => { return AudioPicker.getCurrentAudioDeviceName(); }

export const useBluetooth = () => { AudioPicker.useBluetooth(); }

// Component version, unsure if this is a little bit too much, it's a HoC for sure but, it's a little strange.
// Lots of repeated code, could we just pull the pre-existing instance and leverage it?
interface AudioDeviceInfoProps {
  onAudioDeviceChanged?: ((deviceType: string, deviceName: string) => void)
}

interface IAudioDeviceState {
  currentAudioDeviceType?: string;
  currentAudioDeviceName?: string;
}

export class AudioDeviceInfo extends Component<AudioDeviceInfoProps, IAudioDeviceState> {
  private audioPicker: any;
  private audioEvents: NativeEventEmitter;
  private isObserving: boolean;

  constructor(props: any) {

    super(props);
    this.audioPicker = NativeModules.BRVAudioPicker;
    this.audioEvents = new NativeEventEmitter(NativeModules.BRVAudioPickerEvents);
    this.state = {
      currentAudioDeviceType: null,
      currentAudioDeviceName: null
    }
  }

  componentDidMount() {
    this.deviceChangedHandler(null);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  private deviceChangedHandler = (event: any) => {
    this.audioPicker.getAudioOutput(this.audioOutputTypeHandler);
  }

  private audioOutputTypeHandler = (error: any, result: any) => {
    if (result) {
      this.setState({ currentAudioDeviceType: result["type"], currentAudioDeviceName: result["name"] }, () => { console.log("state updated") });
      if (this.props.onAudioDeviceChanged) {
        this.props.onAudioDeviceChanged(result["type"], result["name"]);
      }
    }
  }

  presentAudioPicker() {
    this.audioPicker.presentAudioPicker(() => { });
  }

  getCurrentDeviceType = () => {
    return this.state.currentAudioDeviceType;
  }

  getCurrentDeviceName = () => {
    return this.state.currentAudioDeviceName;
  }

  start = () => {
    if (!this.isObserving) {
      this.audioEvents.addListener("AudioDeviceChanged", this.deviceChangedHandler);
      this.isObserving = true;
    }
  }

  stop = () => {
    if (this.isObserving) {
      this.audioEvents.removeListener("AudioDeviceChanged", this.deviceChangedHandler);
      this.isObserving = false;
    }
  }

  render() {
    return <View />
  }
}
