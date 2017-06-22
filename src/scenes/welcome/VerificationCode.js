/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {Alert, Platform, Text, View} from "react-native";
import PropTypes from "prop-types";
import FCM from "react-native-fcm";

import CONSTANTS, {RestAPI} from "../../Constants";
import {welcomeStyle} from "../../styles/Style";

import {Env} from "../../utils/EnumHelper";
import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import DUMMY_HELPER from "../../utils/DummyHelper";

import {User} from "../../models/User";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

import {
    PreRegisterRequestClass,
    RegisterViaEmailRequestClass
} from "../../models/RequestAPI";

const reactStringReplace = require('react-string-replace');

export default class WelcomeVerificationCodeScreen extends Component {
    constructor(props) {
        super(props);

        this._welcomeContainer = null;
    }

    setLoading = (loading) => {
        this._welcomeContainer.setLoading(loading);
    };

    render() {
        const navigation = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <WelcomeContainer
                ref={(component) => {
                    this._welcomeContainer = component
                }}
                bottomContainer={
                    <WelcomeVerificationCodeBottomContainer
                        navigation={navigation}
                        email={params.email}
                        password={params.password}
                        setLoading={this.setLoading}
                    />}
                navigation={navigation}
                isBackButtonShowed={ true }
            />
        );
    }
}

class WelcomeVerificationCodeBottomContainer extends Component {
    constructor(props) {
        super(props);

        this._verificationCodeTextField = '';

        let tempVerificationCode = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                tempVerificationCode = DUMMY_HELPER.verificationCode;
                break;
            case Env.DEV:
            case Env.PROD:
                break;
        }

        this.state = {
            verificationCode: tempVerificationCode,
        }
    }

    _onResendPressed = () => {
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                Alert.alert(
                    STRING_HELPER.TITLE_NOTICE,
                    STRING_HELPER.msgResendVerificationCodeSuccess,
                );
                break;
            case Env.DEV:
            case Env.PROD:
                this.props.setLoading(true);
                const preRegisterRequest = new PreRegisterRequestClass(this.props.email, this.props.password);
                return fetch(CONSTANTS.baseUrl + RestAPI.preRegister.url, {
                    method: RestAPI.preRegister.method,
                    headers: RestAPI.preRegister.headers,
                    body: JSON.stringify(preRegisterRequest),
                })
                    .then((response) => {
                        this.props.setLoading(false);
                        return response.json()
                    })
                    .then((responseJson) => {
                        console.log(responseJson);
                        if (responseJson.meta.status === RestAPI.CODE_200) {
                            Alert.alert(
                                STRING_HELPER.TITLE_NOTICE,
                                STRING_HELPER.msgResendVerificationCodeSuccess,
                            );
                        } else {
                            Alert.alert(
                                STRING_HELPER.TITLE_WARNING,
                                responseJson.method.message,
                            );
                        }
                    })
                    .catch((error) => {
                        this.props.setLoading(false);
                        console.error(error);
                    });
                break;
        }
    };

    _getDisplayName = () => {
        const emailSplit = this.props.email.split('@');
        if (emailSplit.length > 0) {
            return emailSplit[0];
        } else {
            return this.props.email;
        }
    };

    _makeRequestVerify = async (email, password, displayName, imei, pushRegId, deviceType, verificationCode) => {
        this.props.setLoading(true);
        try {
            const registerViaEmailRequest = new RegisterViaEmailRequestClass(email, password, displayName, imei, pushRegId, deviceType, verificationCode);
            let response = await fetch(CONSTANTS.baseUrl + RestAPI.registerViaEmail.url, {
                method: RestAPI.registerViaEmail.method,
                headers: RestAPI.registerViaEmail.headers,
                body: JSON.stringify(registerViaEmailRequest),
            });

            this.props.setLoading(false);
            console.log(response);

            return await response.json();
        } catch (error) {
            this.props.setLoading(false);
            console.error(error);
        }
    };

    _onVerifyPressed = () => {
        this._verificationCodeTextField.setError(false, '');

        const {verificationCode} = this.state;

        if (!verificationCode || verificationCode.length === 0) {
            this._verificationCodeTextField.setError(true, STRING_HELPER.errorMsgVerificationCodeRequired);
        } else {
            switch (CONSTANTS.Env) {
                case Env.DEV_DUMMY:
                    const {navigate} = this.props.navigation;
                    navigate(SCREEN_HELPER.ACKNOWLEDGEMENT, {
                        email: DUMMY_HELPER.email,
                        password: DUMMY_HELPER.password
                    });
                    break;
                case Env.DEV:
                case Env.PROD:
                    FCM.getFCMToken()
                        .then(token => {
                            this._makeRequestVerify(
                                this.props.email,
                                this.props.password,
                                this._getDisplayName(),
                                CONSTANTS.uniqueID,
                                token,
                                Platform.OS,
                                verificationCode,
                            )
                                .then((responseJson) => {
                                        if (responseJson.meta.status === RestAPI.CODE_200) {
                                            const {navigate} = this.props.navigation;
                                            navigate(SCREEN_HELPER.ACKNOWLEDGEMENT, {
                                                email: this.props.email,
                                                password: this.props.password
                                            });
                                        } else {
                                            Alert.alert(
                                                STRING_HELPER.TITLE_WARNING,
                                                responseJson.meta.message,
                                            );
                                        }
                                    }
                                ).catch((error) => {
                                console.error(error)
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    break;
            }
        }
    };

    render() {
        let verificationCodeMessage = reactStringReplace(STRING_HELPER.verificationCodeHasBeenSent, /(@email)/g, () => this.props.email);
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <Text style={welcomeStyle.text}>
                        { verificationCodeMessage }
                    </Text>

                    <Text style={welcomeStyle.text}>
                        {"\n"}
                    </Text>

                    <Text style={welcomeStyle.text}>
                        { STRING_HELPER.pleaseTypeVerficationCode }
                    </Text>

                    <View style={welcomeStyle.space}/>

                    <WelcomeTextInput
                        ref={(component) => {
                            this._verificationCodeTextField = component;
                        }}
                        onChangeText={(text) => this.setState({verificationCode: text})}
                        value={ this.state.verificationCode }
                        placeholder={ STRING_HELPER.placeHolderVerificationCode }
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        onSubmitEditing={this._onVerifyPressed}
                    />

                    <View style={welcomeStyle.space}/>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 1}}>
                            <WelcomeButton
                                onPress={this._onResendPressed}
                                text={STRING_HELPER.RESEND}/>
                        </View>

                        <View style={welcomeStyle.space}/>

                        <View style={{flex: 1}}>
                            <WelcomeButton
                                onPress={this._onVerifyPressed}
                                text={STRING_HELPER.VERIFY}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

WelcomeVerificationCodeBottomContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setLoading: PropTypes.func.isRequired,
};