import React from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import SCREEN_HELPER from "./utils/ScreenHelper";
import STRING_HELPER from "./utils/StringHelper";
import {MainTheme} from "./Constants";
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
import HomeSetting from "./scenes/main/Setting";
// New Case
import CameraAndCameraRollNew from "./scenes/newcase/CameraAndCameraRollScreenNew";
import Preview from "./scenes/newcase/Preview";
import LocationDetail from "./scenes/newcase/LocationDetail";
import CaseLogged from "./scenes/newcase/CaseLogged";
// Setting
import ProfileScreen from "./scenes/setting/Profile";
import NotificationsScreen from "./scenes/setting/Notifications";
// Example
import HomeScreenExample from "./example/react-navigation/HomeScreen";
import ChatScreenExample from "./example/react-navigation/ChatScreen";
import HeaderCustomExample from "./example/react-navigation/HeaderCustom";
import WebViewExample from "./example/WebViewExample";
import CarouselExample from "./example/carousel/CarouselExample";

// Example
export const SNAPExampleNavigator = StackNavigator({
    HeaderCustom: {screen: HeaderCustomExample},
    Home: {screen: HomeScreenExample},
    Chat: {screen: ChatScreenExample},
    Carousel: {screen: CarouselExample},
    WebView: {screen: WebViewExample},
});

// Main Tabs
export const MainScreenNavigator = TabNavigator({
    List: {screen: HomeList},
    Grid: {screen: HomeGrid},
    Map: {screen: HomeMap},
    Notif: {screen: HomeNotif},
    Setting: {screen: HomeSetting},
}, {
    tabBarOptions: {
        style: {
            backgroundColor: MainTheme.tabBar_backgroundColor,
        },
        showIcon: true,
        showLabel: false,
        activeTintColor: MainTheme.tabBar_tintColor,
    },
    tabBarPosition: 'bottom',
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

    // Main screens
    Main: {
        // screen: MainScreenNavigator,
        screen: Preview,
        navigationOptions: {
            header: null,
        },
    },

    // Add a new case screens
    CameraAndCameraRoll: {
        screen: CameraAndCameraRollNew,
        navigationOptions: {
            header: null,
        },
    },
    Preview: {
        screen: Preview,
        navigationOptions: {
            header: null,
        }
    },
    LocationDetail: {
        screen: LocationDetail,
        navigationOptions: {
            headerTitle: STRING_HELPER.sceneLocationDetail,
            headerTitleStyle: {
                color: MainTheme.navBar_tintColor,
            },
            headerStyle: {
                backgroundColor: MainTheme.navBar_backgroundColor,
            },
        },
    },
    CaseLogged: {
        screen: CaseLogged,
        navigationOptions: {
            headerTitle: STRING_HELPER.sceneCaseLogged,
            headerTitleStyle: {
                color: MainTheme.navBar_tintColor,
            },
            headerStyle: {
                backgroundColor: MainTheme.navBar_backgroundColor,
            },
        },
    },

    // Setting screens
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
