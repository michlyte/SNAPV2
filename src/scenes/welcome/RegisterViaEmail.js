/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {Alert, View} from "react-native";
import PropTypes from "prop-types";

import CONSTANTS, {RestAPI} from "../../Constants";

import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import DUMMY_HELPER from "../../utils/DummyHelper";
import {isValidEmail, isValidPassword, matchPassword} from "../../utils/ValidationHelper";
import {Env} from "../../utils/EnumHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

import {PreRegisterRequestClass} from "../../models/RequestAPI";

export default class WelcomeRegisterViaEmailScreen extends Component {
    constructor(props) {
        super(props);

        this._welcomeContainer = null;
    }

    setVisible = (visible) => {
        this._welcomeContainer.setVisible(visible);
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                ref={(component) => {
                    this._welcomeContainer = component
                }}
                bottomContainer={
                    <WelcomeRegisterViaEmailBottomContainer
                        navigation={navigation}
                        setVisible={this.setVisible}
                    />
                }
                navigation={navigation}
                isBackButtonShowed={ true }
            />
        );
    }
}

class WelcomeRegisterViaEmailBottomContainer extends Component {
    constructor(props) {
        super(props);

        this._emailTextField = null;
        this._passwordTextField = null;
        this._confirmPasswordTextField = null;

        // Check buildType
        let tempEmailAddress = '';
        let tempPassword = '';
        let tempConfirmPassword = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
            case Env.DEV:
                tempEmailAddress = DUMMY_HELPER.emailAddress;
                tempPassword = DUMMY_HELPER.password;
                tempConfirmPassword = tempPassword;
                break;
            default:
                break;
        }

        this.state = {
            emailAddress: tempEmailAddress,
            password: tempPassword,
            confirmPassword: tempConfirmPassword,
        };
    }

    onNavigateToVerify = (email: string, password: string) => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.VERIFICATION_CODE, {
            email: email,
            password: password,
        });
    };

    _makeRequestPreRegister = async (email, password) => {
        this.props.setVisible(true);
        const preRegisterRequest = new PreRegisterRequestClass(email, password);
        try {
            let response = await fetch(CONSTANTS.baseUrl + RestAPI.preRegister.url, {
                method: RestAPI.preRegister.method,
                headers: RestAPI.preRegister.headers,
                body: JSON.stringify(preRegisterRequest),
            });

            this.props.setVisible(false);
            console.log(response);

            return await response.json();
        } catch (error) {
            this.props.setVisible(false);
            console.error(error);
        }
    };

    _onRegisterPressed = () => {
        this._emailTextField.setError(false, '');
        this._passwordTextField.setError(false, '');
        this._confirmPasswordTextField.setError(false, '');

        const {emailAddress, password, confirmPassword} = this.state;

        if (!emailAddress || emailAddress.length === 0) {
            this._emailTextField.setError(true, STRING_HELPER.errorMsgEmailAddressRequired);
        } else if (!isValidEmail(emailAddress)) {
            this._emailTextField.setError(true, STRING_HELPER.errorMsgEmailAddressInvalid);
        } else if (!password || password.length === 0) {
            this._passwordTextField.setError(true, STRING_HELPER.errorMsgPasswordRequired);
        } else if (!isValidPassword(password)) {
            this._passwordTextField.setError(true, STRING_HELPER.errorMsgPasswordTooShort);
        } else if (!confirmPassword || confirmPassword.length === 0) {
            this._confirmPasswordTextField.setError(true, STRING_HELPER.errorMsgPasswordRequired);
        } else if (!isValidPassword(confirmPassword)) {
            this._confirmPasswordTextField.setError(true, STRING_HELPER.errorMsgPasswordTooShort);
        } else if (!matchPassword(password, confirmPassword)) {
            this._confirmPasswordTextField.setError(true, STRING_HELPER.errorMsgPasswordDontMatch);
        } else {
            switch (CONSTANTS.Env) {
                case Env.DEV_DUMMY:
                    this.onNavigateToVerify(emailAddress, password);
                    break;
                case Env.DEV:
                case Env.PROD:
                    this._makeRequestPreRegister(emailAddress, password)
                        .then((responseJson) => {
                            if (responseJson.meta.status === RestAPI.CODE_200) {
                                this.onNavigateToVerify(emailAddress, password);
                            } else {
                                Alert.alert(
                                    STRING_HELPER.TITLE_WARNING,
                                    responseJson.meta.message,
                                );
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    break;
            }
        }
    };

    onEmailSubmitEditing = () => {
        this._passwordTextField.focus();
    };

    onPasswordSubmitEditing = () => {
        this._confirmPasswordTextField.focus();
    };

    render() {
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <WelcomeTextInput
                        ref={(component) => {
                            this._emailTextField = component;
                        }}
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                        onSubmitEditing={this.onEmailSubmitEditing}
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeTextInput
                        ref={(component) => {
                            this._passwordTextField = component;
                        }}
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRING_HELPER.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='next'
                        onSubmitEditing={this.onPasswordSubmitEditing}
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeTextInput
                        ref={(component) => {
                            this._confirmPasswordTextField = component;
                        }}
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={ this.state.confirmPassword }
                        placeholder={ STRING_HELPER.placeHolderConfirmPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
                        onSubmitEditing={this._onRegisterPressed}
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeButton
                        onPress={this._onRegisterPressed}
                        text={STRING_HELPER.REGISTER}/>
                </View>
            </View>
        );
    }
}

WelcomeRegisterViaEmailBottomContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    setVisible: PropTypes.func.isRequired,
};