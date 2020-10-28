package com.reactnativeaudiopicker;

import android.content.Context;
import android.media.AudioManager;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class AudioPickerEvents extends ReactContextBaseJavaModule {

  private final AudioManager audioManager;

  @NonNull
  @Override
  public String getName() {
    return "BRVAudioPickerEvents";
  }

  @RequiresApi(api = Build.VERSION_CODES.M)
  public AudioPickerEvents(ReactApplicationContext reactContext) {
    super(reactContext);

    audioManager
      = (AudioManager)
      reactContext.getSystemService(Context.AUDIO_SERVICE);

    // TODO: Setup
  }
}
