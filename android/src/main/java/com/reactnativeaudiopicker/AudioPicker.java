package com.reactnativeaudiopicker;

import android.media.AudioManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import kotlin.TypeCastException;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;


public final class AudioPicker extends ReactContextBaseJavaModule {
  @NotNull
  private final AudioManager audioManager;

  @NotNull
  public final AudioManager getAudioManager() {
    return this.audioManager;
  }


  @NotNull
  public String getName() {
    return "BRVAudioPicker";
  }

  @ReactMethod
  public final void useSpeaker(@NotNull Callback callback) {
    Intrinsics.checkParameterIsNotNull(callback, "callback");
    this.audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
    if (this.audioManager.isBluetoothScoOn()) {
      this.audioManager.setBluetoothScoOn(false);
      this.audioManager.stopBluetoothSco();
    }

    this.audioManager.setSpeakerphoneOn(true);
    callback.invoke(null, null);
  }

  @ReactMethod
  public final void useBluetooth(@NotNull Callback callback) {
    Intrinsics.checkParameterIsNotNull(callback, "callback");
    this.audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
    this.audioManager.setSpeakerphoneOn(false);
    this.audioManager.startBluetoothSco();
    this.audioManager.setBluetoothScoOn(true);
    callback.invoke(null, null);
  }

  @ReactMethod
  public final void useEarpiece(@NotNull Callback callback) {
    Intrinsics.checkParameterIsNotNull(callback, "callback");
    this.audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
    this.audioManager.setSpeakerphoneOn(false);
    if (this.audioManager.isBluetoothScoOn()) {
      this.audioManager.setBluetoothScoOn(false);
      this.audioManager.stopBluetoothSco();
    }

    callback.invoke(null, null);
  }

  @ReactMethod
  public final void getAudioOutput(@NotNull Callback callback) {
    Intrinsics.checkParameterIsNotNull(callback, "callback");
    this.audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
    String audioType = "Unknown";
    if (this.audioManager.isSpeakerphoneOn()) {
      audioType = "Speaker";
    } else if (this.audioManager.isBluetoothScoOn()) {
      audioType = "Bluetooth";
    } else if (this.audioManager.isWiredHeadsetOn()) {
      audioType = "Headphones";
    } else {
      audioType = "Earpiece";
    }

    WritableMap result = Arguments.createMap();
    // Unfortunately we can't get device names due to many API issues and specific device issues.
    // It's incredibly unsafe.
    result.putString("name", "");
    result.putString("type", audioType);

    callback.invoke(null, result);
  }

  public AudioPicker(@NotNull ReactApplicationContext reactContext) {
    super(reactContext);
    Object audioManager = this.getReactApplicationContext().getSystemService("audio");
    if (audioManager == null) {
      throw new TypeCastException("null cannot be cast to non-null type android.media.AudioManager");
    } else {
      this.audioManager = (AudioManager) audioManager;
    }
  }
}
