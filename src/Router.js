import React from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import SCREEN_HELPER from "./utils/ScreenHelper";
import THEME from "./style/Theme";
// Welcome
import WelcomeScreen from "./scenes/welcome/Welcome";
import WelcomeRegisterViaEmailScreen from "./scenes/welcome/RegisterViaEmail";
import WelcomeVerificationCodeScreen from "./scenes/welcome/VerificationCode";
import WelcomeAcknowledgementScreen from "./scenes/welcome/Acknowledgement";
import Forgot from "./scenes/welcome/Forgot";
import ForgotAcknowledgment from "./scenes/welcome/ForgotAcknowledgment";
// Home Tab
import HomeList from "./scenes/main/List";
import HomeGrid from "./scenes/main/Grid";
import HomeMap from "./scenes/main/Map";
import HomeNotif from "./scenes/main/Notif";
// New Case
import CameraAndCameraRoll from "./scenes/newcase/CameraAndCameraRollScreen";
// Example
import WebViewExample from "./example/WebViewExample";
import CarouselExample from "./example/carousel/CarouselExample";

export const MainScreenNavigator = TabNavigator({
    Notif: {screen: HomeNotif},
    List: {screen: HomeList},
    Grid: {screen: HomeGrid},
    Map: {screen: HomeMap},
}, {
    tabBarOptions: {
        style: {
            backgroundColor: THEME.tabBar_backgroundColor,
        },
        activeTintColor: THEME.tabBar_tintColor,
    },
});

export const SNAPExampleNavigator = StackNavigator({
    Carousel: {screen: CarouselExample},
    WebView: {screen: WebViewExample},
});

// SNAP : If you change any screen name please do the same in the ScreenHelper.js file.
export const SNAPWelcomeNavigator = StackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: SCREEN_HELPER.WELCOME,
            header: null,
        },
    },
    RegisterEmail: {
        screen: WelcomeRegisterViaEmailScreen,
        navigationOptions: {
            title: SCREEN_HELPER.REGISTER_EMAIL,
            header: null,
        },
    },
    VerificationCode: {
        screen: WelcomeVerificationCodeScreen,
        navigationOptions: {
            title: SCREEN_HELPER.VERIFICATION_CODE,
            header: null,
        },
    },
    Acknowledgement: {
        screen: WelcomeAcknowledgementScreen,
        navigationOptions: {
            title: SCREEN_HELPER.ACKNOWLEDGEMENT,
            header: null,
        },
    },
    Forgot: {
        screen: Forgot,
        navigationOptions: {
            title: SCREEN_HELPER.FORGOT,
            header: null,
        },
    },
    ForgotAcknowledgment: {
        screen: ForgotAcknowledgment,
        navigationOptions: {
            title: SCREEN_HELPER.FORGOT_ACKNOWLEDGMENT,
            header: null,
        },
    },

    // Main Screens
    Main: {
        screen: MainScreenNavigator,
    },
    CameraAndCameraRoll: {
        screen: CameraAndCameraRoll,
        navigationOptions: {
            header: null,
        },
    }
});
