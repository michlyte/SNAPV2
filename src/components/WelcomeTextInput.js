/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import PropTypes from "prop-types";
import SIZE from "../styles/Size";

export default class WelcomeTextInput extends Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.state = {
            error: false,
            errorMessage: '',
        }
    }

    setError = (error, errorMessage?) => {
        this.setState({
            error: error,
            errorMessage: errorMessage,
        });
    };

    focus = () => {
        this.textInput.focus();
    };

    onFocus = () => {
        this.setState({
            errorMessage: '',
        });
    };

    render() {
        let errorView = null;
        if (this.state.error) {
            errorView =
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingRight: 5,
                }}>
                    <Text
                        style={{
                            color: 'red',
                        }}
                    >
                        {this.state.errorMessage}
                    </Text>
                </View>;
        }
        return (
            <View>
                <TextInput
                    ref={(component) => {
                        this.textInput = component
                    }}
                    style={[
                        styles.welcomeTextInput,
                        this.state.error && styles.error
                    ]}
                    onChangeText={ this.props.onChangeText }
                    value={ this.props.value }
                    placeholder={ this.props.placeholder }
                    keyboardType={ this.props.keyboardType }
                    secureTextEntry={ this.props.secureTextEntry }
                    clearButtonMode='while-editing'
                    underlineColorAndroid='transparent'
                    onSubmitEditing={ this.props.onSubmitEditing }
                    returnKeyType={ this.props.returnKeyType }
                    onFocus={this.onFocus}
                />
                {errorView}
            </View>
        );
    }
}

WelcomeTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    returnKeyType: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    welcomeTextInput: {
        paddingLeft: 5,
        paddingRight: 5,
        height: SIZE.WELCOME_BUTTON_HEIGHT,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 18,
    },
    error: {
        borderColor: 'red',
    },
});