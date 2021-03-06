/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {View} from "react-native";

import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

export default class WelcomeForgotScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeForgotBottomContainer
                        navigation={navigation}
                    />
                }
                navigation={navigation}
                isBackButtonShowed={ true }
            />
        );
    }
}

class WelcomeForgotBottomContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
        }
    }

    _onForgotPressed = () => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.FORGOT_ACKNOWLEDGMENT);
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='done'
                    />
                    <View style={welcomeStyle.space}/>
                    <WelcomeButton
                        onPress={this._onForgotPressed}
                        text={STRING_HELPER.FORGOT}/>
                </View>
            </View>
        );
    }
}