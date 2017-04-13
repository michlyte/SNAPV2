/**
 * Created by michael on 4/13/2017.
 */
import {
    StyleSheet
} from 'react-native';

import SIZE from './Size';
import COLOR from './Color';

const STYLE = StyleSheet.create({
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
        height: SIZE.WELCOME_HEIGHT_SPACE,
    },
});

module.exports = STYLE;