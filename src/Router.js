import React from 'react';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import SCREEN from './util/Screen';
import THEME from './util/Theme';

// Welcome
import WelcomeScreen from './screen/welcome/WelcomeScreen';
import WelcomeRegisterViaEmailScreen from './screen/welcome/WelcomeRegisterViaEmailScreen';
import WelcomeVerificationCodeScreen from './screen/welcome/WelcomeVerificationCodeScreen';
import WelcomeAcknowledgementScreen from './screen/welcome/WelcomeAcknowledgementScreen';
import WelcomeForgotScreen from './screen/welcome/WelcomeForgotScreen';

// Home Tab
import HomeList from './screen/main/List';
import HomeGrid from './screen/main/Grid';

// New Case
import CameraAndCameraRoll from './screen/newcase/CameraAndCameraRollScreen';

// Example
import WebViewExample from './example/WebViewExample';
import CarouselExample from './example/carousel/CarouselExample';

export const MainScreenNavigator = TabNavigator({
    List: {screen: HomeList},
    Grid: {screen: HomeGrid},
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

// SNAP : If you change any screen name please do the same in the Screen.js file.
export const SNAPWelcomeNavigator = StackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: SCREEN.WELCOME,
            header: null,
        },
    },
    RegisterEmail: {
        screen: WelcomeRegisterViaEmailScreen,
        navigationOptions: {
            title: SCREEN.REGISTER_EMAIL,
            header: null,
        },
    },
    VerificationCode: {
        screen: WelcomeVerificationCodeScreen,
        navigationOptions: {
            title: SCREEN.VERIFICATION_CODE,
            header: null,
        },
    },
    Acknowledgement: {
        screen: WelcomeAcknowledgementScreen,
        navigationOptions: {
            title: SCREEN.ACKNOWLEDGEMENT,
            header: null,
        },
    },
    Forgot: {
        screen: WelcomeForgotScreen,
        navigationOptions: {
            title: SCREEN.FORGOT,
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
