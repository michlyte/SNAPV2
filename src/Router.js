import React from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import SCREEN_HELPER from "./utils/ScreenHelper";
import STRING_HELPER from "./utils/StringHelper";
import CONSTANTS from "./Constants";
// Welcome
import WelcomeScreen from "./scenes/welcome/Welcome";
import WelcomeRegisterViaEmailScreen from "./scenes/welcome/RegisterViaEmail";
// import RegisterViaEmailNew from "./scenes/welcome/RegisterViaEmailNew";
import WelcomeVerificationCodeScreen from "./scenes/welcome/VerificationCode";
import WelcomeAcknowledgementScreen from "./scenes/welcome/Acknowledgement";
import Forgot from "./scenes/welcome/Forgot";
import ForgotAcknowledgment from "./scenes/welcome/ForgotAcknowledgment";
// Home Tab
import HomeList from "./scenes/main/List";
import HomeGrid from "./scenes/main/Grid";
import HomeMap from "./scenes/main/Map";
import HomeNotif from "./scenes/main/Notif";
import HomeSetting from "./scenes/main/Setting";
// New Case
import CameraAndCameraRollNew from "./scenes/newcase/CameraAndCameraRollScreenNew";
import LocationDetail from "./scenes/newcase/LocationDetail";
import CaseLogged from "./scenes/newcase/CaseLogged";
// Setting
import ProfileScreen from "./scenes/setting/Profile";
import NotificationsScreen from "./scenes/setting/Notifications";
// Example
import WebViewExample from "./example/WebViewExample";
import CarouselExample from "./example/carousel/CarouselExample";

export const MainScreenNavigator = TabNavigator({
    List: {screen: HomeList},
    Grid: {screen: HomeGrid},
    Map: {screen: HomeMap},
    Notif: {screen: HomeNotif},
    Setting: {screen: HomeSetting},
}, {
    tabBarOptions: {
        style: {
            backgroundColor: CONSTANTS.theme.tabBar_backgroundColor,
        },
        showIcon: true,
        showLabel: false,
        activeTintColor: CONSTANTS.theme.tabBar_tintColor,
    },
    tabBarPosition: 'bottom',
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
        // screen: MainScreenNavigator,
        screen: NotificationsScreen,
        navigationOptions: {
            title: SCREEN_HELPER.NOTIFICATIONS,
        }
    },
    CameraAndCameraRoll: {
        screen: CameraAndCameraRollNew,
        navigationOptions: {
            header: null,
        },
    },
    LocationDetail: {
        screen: LocationDetail,
        navigationOptions: {
            headerTitle: STRING_HELPER.sceneLocationDetail,
            headerTitleStyle: {
                color: CONSTANTS.theme.navBar_tintColor,
            },
            headerStyle: {
                backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
            },
        },
    },
    CaseLogged: {
        screen: CaseLogged,
        navigationOptions: {
            headerTitle: STRING_HELPER.sceneCaseLogged,
            headerTitleStyle: {
                color: CONSTANTS.theme.navBar_tintColor,
            },
            headerStyle: {
                backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
            },
        },
    },

    // Setting
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            title: SCREEN_HELPER.PROFILE,
        }
    },
    Notifications: {
        screen: NotificationsScreen,
        navigationOptions: {
            title: SCREEN_HELPER.NOTIFICATIONS,
        }
    },
});
