/**
 * Created by michael on 4/13/2017.
 */
import {
    StyleSheet
} from 'react-native';

import SIZE from '../util/Size';
import COLOR from './Color';
import THEME from './Theme';

export default STYLE = StyleSheet.create({
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
        color: THEME.text_welcome_tintColor,
        fontSize: 18,
    }
});

module.exports = STYLE;