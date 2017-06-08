package com.sampleapp;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNGooglePlacesPackage(),
                    new RNGeocoderPackage(),
                    new PickerPackage(),
                    new ImagePickerPackage(),
                    new RCTCameraPackage(),
                    new FIRMessagingPackage(),
                    new VectorIconsPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new TwitterSigninPackage(),
                    new MapsPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
    }
}
