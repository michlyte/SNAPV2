/**
 * Created by michael on 4/13/2017.
 */
import {
    StyleSheet
} from 'react-native';

import {WelcomeTheme, MainTheme} from "../Constants";
import SIZE from './Size';
import COLOR from './Color';

export const welcomeStyle = StyleSheet.create({
//    Welcome
    containerBottom: {
        flex: 3.5,
        backgroundColor: 'transparent',
    },
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: COLOR.WELCOME_BACKGROUND_BOTTOM_CONTAINER,
        marginTop: SIZE.WELCOME_TABBAR_HEIGHT,
        padding: 20,
    },
    space: {
        width: SIZE.WELCOME_WIDTH_SPACE,
        height: SIZE.WELCOME_HEIGHT_SPACE,
    },
    divider: {
        width: 5,
    },
    text: {
        color: WelcomeTheme.text_welcome_tintColor,
        fontSize: 18,
    },
    spaceMarginBottom: {
        marginBottom: SIZE.WELCOME_HEIGHT_SPACE,
    },
});

export const mainStyle = StyleSheet.create({
    mainHeaderTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: MainTheme.navBar_tintColor,
    },
    mainHeader: {
        backgroundColor: MainTheme.navBar_backgroundColor,
    },
});