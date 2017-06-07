/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight} from "react-native";
import CONSTANTS from "../Constants";
import SIZE from "../styles/Size";

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
        backgroundColor: CONSTANTS.theme.button_welcome_backgroundColor,
        height: SIZE.WELCOME_BUTTON_HEIGHT,
    },
    welcomeActionButtonText: {
        color: CONSTANTS.theme.button_welcome_tintColor,
        fontSize: 22,
    },
});