/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {Text, View} from "react-native";

import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeButton from "../../components/WelcomeButton";

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
                        email={params.email}/> }
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
        console.log('_onResendPressed');
    };

    _onVerifyPressed = () => {
        console.log('_onVerifyPressed');
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.ACKNOWLEDGEMENT, {email: this.props.email});
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