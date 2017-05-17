/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {View} from "react-native";

import STYLE from "../../style/Style";

import STRING_HELPER from "../../utils/StringHelper";

import WelcomeContainer from "./WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

export default class WelcomeForgotScreen extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeForgotBottomContainer navigation={navigation}/> }
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

    _onForgotPressed() {
        console.log('_onForgotPressed')
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='done'
                    />
                    <View style={STYLE.space}/>
                    <WelcomeButton
                        onPress={this._onForgotPressed.bind(this)}
                        text={STRING_HELPER.FORGOT}/>
                </View>
            </View>
        );
    }
}