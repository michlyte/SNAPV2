/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {WelcomeTheme} from "../Constants";
import SIZE from "../styles/Size";

export default class WelcomeButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={ styles.welcomeActionButton }
                onPress={ this.props.onPress }>
                <Text
                    style={ styles.welcomeActionButtonText }>
                    { this.props.text }
                </Text>
            </TouchableOpacity>
        );
    }
}

WelcomeButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    welcomeActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WelcomeTheme.button_welcome_backgroundColor,
        height: SIZE.WELCOME_BUTTON_HEIGHT,
    },
    welcomeActionButtonText: {
        color: WelcomeTheme.button_welcome_tintColor,
        fontSize: 22,
    },
});