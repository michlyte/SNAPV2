/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {Text, View} from "react-native";

import STYLE from "../../style/Style";

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

        this.onResendPressed = this._onResendPressed.bind(this);
        this.onVerifyPressed = this._onVerifyPressed.bind(this);

        this.state = {
            verificationCode: '',
        }
    }

    _onResendPressed() {
        console.log('_onResendPressed');
    }

    _onVerifyPressed() {
        console.log('_onVerifyPressed');
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.ACKNOWLEDGEMENT, {email: this.props.email});
    }

    render() {
        let verificationCodeMessage = reactStringReplace(STRING_HELPER.verificationCodeHasBeenSent, /(@email)/g, () => this.props.email);
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <Text style={STYLE.text}>
                        { verificationCodeMessage }
                    </Text>

                    <Text style={STYLE.text}>
                        {"\n"}
                    </Text>

                    <Text style={STYLE.text}>
                        { STRING_HELPER.pleaseTypeVerficationCode }
                    </Text>

                    <View style={STYLE.space}/>

                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({verificationCode: text})}
                        value={ this.state.verificationCode }
                        placeholder={ STRING_HELPER.placeHolderVerificationCode }
                        keyboardType='phone-pad'
                        returnKeyType='done'
                    />

                    <View style={STYLE.space}/>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 1}}>
                            <WelcomeButton
                                onPress={this.onResendPressed}
                                text={STRING_HELPER.RESEND}/>
                        </View>

                        <View style={STYLE.space}/>

                        <View style={{flex: 1}}>
                            <WelcomeButton
                                onPress={this.onVerifyPressed}
                                text={STRING_HELPER.VERIFY}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}