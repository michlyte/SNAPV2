/**
 * Created by michael on 4/13/2017.
 */
import React, {
    Component,
} from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import COLOR from '../util/Color';
import SIZE from '../util/Size';

export default class WelcomeButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={ styles.welcomeActionButton }
                onPress={ this.props.onPress }>
                <Text
                    style={ styles.welcomeActionButtonText }>
                    { this.props.text }
                </Text>
            </TouchableHighlight>
        );
    }
}

WelcomeButton.propTypes = {
    onPress: React.PropTypes.func,
    text: React.PropTypes.string,
};

const styles = StyleSheet.create({
    welcomeActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.GREEN,
        height: SIZE.WELCOME_BUTTON_HEIGHT,
    },
    welcomeActionButtonText: {
        color: COLOR.WELCOME_BUTTON_TINT_COLOR,
        fontSize: 22,
    },
});