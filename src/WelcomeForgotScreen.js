/**
 * Created by michael on 4/13/2017.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import SCREEN from './util/Screen';
import STYLE from './util/Style';
import STRINGS from './util/Strings';
import WelcomeContainer from './WelcomeContainer';
import WelcomeTextInput from './ecq/WelcomeTextInput';
import WelcomeButton from './ecq/WelcomeButton';

export default class WelcomeForgotScreen extends Component {
    static navigationOptions = {
        title: SCREEN.FORGOT,
        header: {
            visible: false
        }
    };
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
                        onChangeText={(text) => this.setState({ emailAddress: text })}
                        value={ this.state.emailAddress }
                        placeholder={ STRINGS.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='done'
                    />
                    <View style={STYLE.space}/>
                    <WelcomeButton
                        onPress={this._onForgotPressed.bind(this)}
                        text={STRINGS.FORGOT}/>
                </View>
            </View>
        );
    }
}