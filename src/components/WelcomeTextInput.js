/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {StyleSheet, TextInput} from "react-native";
import SIZE from "../style/Size";

export default class WelcomeTextInput extends Component {
    render() {
        return (
            <TextInput
                style={ styles.welcomeTextInput }
                onChangeText={ this.props.onChangeText }
                value={ this.props.value }
                placeholder={ this.props.placeholder }
                keyboardType={ this.props.keyboardType }
                secureTextEntry={ this.props.secureTextEntry }
                clearButtonMode='while-editing'
                underlineColorAndroid='transparent'
                onSubmitEditing={ this.props.onSubmitEditing }
                returnKeyType={ this.props.returnKeyType }
            />
        );
    }
}

WelcomeTextInput.propTypes = {
    onChangeText: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    keyboardType: React.PropTypes.string,
    onSubmitEditing: React.PropTypes.func,
    returnKeyType: React.PropTypes.string,
};

const styles = StyleSheet.create({
    welcomeTextInput: {
        height: SIZE.WELCOME_BUTTON_HEIGHT,
        backgroundColor: 'white',
        fontSize: 18,
    },
});