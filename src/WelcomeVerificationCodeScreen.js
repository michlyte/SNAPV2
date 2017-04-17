/**
 * Created by michael on 4/17/2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import SCREEN from './util/Screen';
import STYLE from './util/Style';
import STRINGS from './util/Strings';
import WelcomeContainer from './WelcomeContainer';
import WelcomeTextInput from './ecq/WelcomeTextInput';
import WelcomeButton from './ecq/WelcomeButton';

const reactStringReplace = require('react-string-replace');

export default class WelcomeVerificationCodeScreen extends Component {
    static navigationOptions = {
        title: SCREEN.VERIFICATION_CODE,
        header: {
            visible: false
        }
    };

    render() {
        const navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        return(
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

        this.state =  {
            verificationCode: '',
        }
    }

    _onResendPressed() {
        console.log('_onResendPressed');
    }

    _onVerifyPressed() {
        console.log('_onVerifyPressed');
        const { navigate } = this.props.navigation;
        navigate(SCREEN.ACKNOWLEDGEMENT, { email: this.props.email });
    }

    render() {
        let verificationCodeMessage = reactStringReplace(STRINGS.verificationCodeHasBeenSent, /(@email)/g, () => this.props.email);
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
                        { STRINGS.pleaseTypeVerficationCode }
                    </Text>

                    <View style={STYLE.space}/>

                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({ verificationCode: text })}
                        value={ this.state.verificationCode }
                        placeholder={ STRINGS.placeHolderVerificationCode }
                        keyboardType='phone-pad'
                        returnKeyType='done'
                    />

                    <View style={STYLE.space}/>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <WelcomeButton
                                onPress={this._onResendPressed.bind(this)}
                                text={STRINGS.RESEND}/>
                        </View>

                        <View style={STYLE.space}/>

                        <View style={{ flex: 1 }}>
                            <WelcomeButton
                                onPress={this._onVerifyPressed.bind(this)}
                                text={STRINGS.VERIFY}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}