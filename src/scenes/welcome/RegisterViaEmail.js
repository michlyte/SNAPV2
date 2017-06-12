/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {View} from "react-native";

import CONSTANTS from "../../Constants";
import STYLE from "../../styles/Style";

import SCREEN_HELPER from "../../utils/ScreenHelper";
import STRING_HELPER from "../../utils/StringHelper";
import {Env} from "../../utils/EnumHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

export default class WelcomeRegisterViaEmailScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeRegisterViaEmailBottomContainer navigation={navigation}/> }
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
                tempEmailAddress = 'mikefla10@gmail.com';
                tempPassword = 'password$1';
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

    _onRegisterPressed = () => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.VERIFICATION_CODE, {email: this.state.emailAddress});
    };

    render() {
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                    />
                    <View style={STYLE.space}/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRING_HELPER.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='next'
                    />
                    <View style={STYLE.space}/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={ this.state.confirmPassword }
                        placeholder={ STRING_HELPER.placeHolderConfirmPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
                    />
                    <View style={STYLE.space}/>
                    <WelcomeButton
                        onPress={this._onRegisterPressed}
                        text={STRING_HELPER.REGISTER}/>
                </View>
            </View>
        );
    }
}