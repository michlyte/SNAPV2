/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import t from "tcomb-form-native";

import CONSTANTS from "../../Constants";
import STYLE from "../../styles/Style";

import SCREEN_HELPER from "../../utils/ScreenHelper";
import STRING_HELPER from "../../utils/StringHelper";
import {Env} from "../../utils/EnumHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";
import WelcomeTextInput from "../../components/WelcomeTextInput";

let Form = t.form.Form;

export default class RegisterViaEmailNew extends Component {
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

        this.data = t.struct({
            email: t.String,
            password: t.String,
            confirmPassword: t.String,
        });

        // Check buildType
        let tempEmailAddress = '';
        let tempPassword = '';
        let tempConfirmPassword = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                // tempEmailAddress = 'mikefla10@gmail.com';
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
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
        }

        // const {navigate} = this.props.navigation;
        // navigate(SCREEN_HELPER.VERIFICATION_CODE, {email: this.state.emailAddress});
    };

    render() {
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <Form
                        ref="form"
                        type={this.data}
                        value={this.state}
                        options={{
                            auto: 'placeholders',
                            fields: {
                                email: {
                                    error: STRING_HELPER.errorMsgEmailAddress,
                                    template: () => {
                                        return (
                                            <View style={STYLE.spaceMarginBottom}>
                                                <WelcomeTextInput
                                                    onChangeText={(text) => this.setState({emailAddress: text})}
                                                    value={ this.state.emailAddress }
                                                    placeholder={ STRING_HELPER.placeHolderEmailAddress }
                                                    keyboardType='email-address'
                                                    returnKeyType='next'
                                                />
                                            </View>
                                        );
                                    },
                                },
                                password: {
                                    template: () => {
                                        return (
                                            <View style={STYLE.spaceMarginBottom}>
                                                <WelcomeTextInput
                                                    onChangeText={(text) => this.setState({password: text})}
                                                    value={ this.state.password }
                                                    placeholder={ STRING_HELPER.placeHolderPassword }
                                                    secureTextEntry={ true }
                                                    returnKeyType='next'
                                                />
                                            </View>
                                        );
                                    },
                                },
                                confirmPassword: {
                                    template: () => {
                                        return (
                                            <View style={STYLE.spaceMarginBottom}>
                                                <WelcomeTextInput
                                                    onChangeText={(text) => this.setState({confirmPassword: text})}
                                                    value={ this.state.confirmPassword }
                                                    placeholder={ STRING_HELPER.placeHolderConfirmPassword }
                                                    secureTextEntry={ true }
                                                    returnKeyType='done'
                                                />
                                            </View>
                                        );
                                    },
                                }
                            },
                        }}
                    />
                    <WelcomeButton
                        onPress={this._onRegisterPressed}
                        text={STRING_HELPER.REGISTER}/>
                </View>
            </View>
        );
    }
}