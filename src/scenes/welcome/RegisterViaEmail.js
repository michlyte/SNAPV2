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
import {Env} from "../../utils/EnumHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

import {PreRegisterRequestClass} from "../../models/RequestAPI";

export default class WelcomeRegisterViaEmailScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeRegisterViaEmailBottomContainer
                        navigation={navigation}
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

        // Check buildType
        let tempEmailAddress = '';
        let tempPassword = '';
        let tempConfirmPassword = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
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

    _makeRequestPreRegister = (email, password) => {
        const preRegisterRequest = new PreRegisterRequestClass(email, password);
        return fetch(CONSTANTS.baseUrl + RestAPI.preRegister.url, {
            method: RestAPI.preRegister.method,
            headers: RestAPI.preRegister.headers,
            body: JSON.stringify(preRegisterRequest),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                if (responseJson.meta.status === RestAPI.CODE_200) {
                    const {navigate} = this.props.navigation;
                    navigate(SCREEN_HELPER.VERIFICATION_CODE, {
                        email: email,
                        password: password,
                    });
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
    };

    _onRegisterPressed = () => {
        const {emailAddress, password} = this.state;

        this._makeRequestPreRegister(emailAddress, password);
    };

    render() {
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRING_HELPER.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='next'
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={ this.state.confirmPassword }
                        placeholder={ STRING_HELPER.placeHolderConfirmPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
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
};