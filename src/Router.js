import React from 'react';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import SCREEN from './util/Screen';
import COLOR from './util/Color';

import Icon from 'react-native-vector-icons/FontAwesome';

// Welcome
import WelcomeScreen from './WelcomeScreen';
import WelcomeRegisterViaEmailScreen from './WelcomeRegisterViaEmailScreen';
import WelcomeVerificationCodeScreen from './WelcomeVerificationCodeScreen';
import WelcomeAcknowledgementScreen from './WelcomeAcknowledgementScreen';
import WelcomeForgotScreen from './WelcomeForgotScreen';

// Home Tab
import HomeList from './List';
import HomeGrid from './Grid';

// Example
import WebViewExample from './example/WebViewExample';
import CarouselExample from './example/carousel/CarouselExample';

export const MainScreenNavigator = TabNavigator({
    List: {
        screen: HomeList,
        navigationOptions: {
            title: 'List',
            headerRight: <Icon name="plus" size={20} color={COLOR.GREEN}/>,
        },
    },
    Grid: {screen: HomeGrid},
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
            header: {
                visible: false
            }
        },
    },
    RegisterEmail: {
        screen: WelcomeRegisterViaEmailScreen,
        navigationOptions: {
            title: SCREEN.REGISTER_EMAIL,
            header: {
                visible: false
            }
        },
    },
    VerificationCode: {
        screen: WelcomeVerificationCodeScreen,
        navigationOptions: {
            title: SCREEN.VERIFICATION_CODE,
            header: {
                visible: false
            }
        },
    },
    Acknowledgement: {
        screen: WelcomeAcknowledgementScreen,
        navigationOptions: {
            title: SCREEN.ACKNOWLEDGEMENT,
            header: {
                visible: false
            }
        },
    },
    Forgot: {
        screen: WelcomeForgotScreen,
        navigationOptions: {
            title: SCREEN.FORGOT,
            header: {
                visible: false
            }
        },
    },

    // Main Screens
    Main: {
        screen: MainScreenNavigator,
    },
});
