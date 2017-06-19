/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {Alert, Platform, Text, View} from "react-native";
import PropTypes from "prop-types";
import FCM from "react-native-fcm";

import CONSTANTS, {RestAPI} from "../../Constants";
import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

import {
    PreRegisterRequestClass,
    RegisterViaEmailRequestClass
} from "../../models/RequestAPI";

const reactStringReplace = require('react-string-replace');

export default class WelcomeVerificationCodeScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeVerificationCodeBottomContainer
                        navigation={navigation}
                        email={params.email}
                        password={params.password}
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

        this.state = {
            verificationCode: '',
        }
    }

    _onResendPressed = () => {
        const preRegisterRequest = new PreRegisterRequestClass(this.props.email, this.props.password);
        return fetch(CONSTANTS.baseUrl + RestAPI.preRegister.url, {
            method: RestAPI.preRegister.method,
            headers: RestAPI.preRegister.headers,
            body: JSON.stringify(preRegisterRequest),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.meta.status === RestAPI.CODE_200) {

                } else {
                    Alert.alert(
                        STRING_HELPER.TITLE_WARNING,
                        responseJson.method.message,
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    _getDisplayName = () => {
        const emailSplit = this.props.email.split('@');
        if (emailSplit.length > 0) {
            return emailSplit[0];
        } else {
            return this.props.email;
        }
    };

    _makeRequestVerify = (email, password, displayName, imei, pushRegId, deviceType, verificationCode) => {
        const registerViaEmailRequest = new RegisterViaEmailRequestClass(email, password, displayName, imei, pushRegId, deviceType, verificationCode);
        return fetch(CONSTANTS.baseUrl + RestAPI.registerViaEmail.url, {
            method: RestAPI.registerViaEmail.method,
            headers: RestAPI.registerViaEmail.headers,
            body: JSON.stringify(registerViaEmailRequest),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.meta.status === RestAPI.CODE_200) {
                    const {navigate} = this.props.navigation;
                    navigate(SCREEN_HELPER.ACKNOWLEDGEMENT, {email: email});
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

    _onVerifyPressed = () => {
        const {verificationCode} = this.state;

        FCM.getFCMToken().then(token => {
            this._makeRequestVerify(
                this.props.email,
                this.props.password,
                this._getDisplayName(),
                CONSTANTS.uniqueID,
                token,
                Platform.OS,
                verificationCode,
            );
        });
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
                        onChangeText={(text) => this.setState({verificationCode: text})}
                        value={ this.state.verificationCode }
                        placeholder={ STRING_HELPER.placeHolderVerificationCode }
                        keyboardType='phone-pad'
                        returnKeyType='done'
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
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};