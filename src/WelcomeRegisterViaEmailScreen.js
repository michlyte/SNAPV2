/**
 * Created by michael on 4/13/2017.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import SCREEN from './util/Screen';
import COLOR from './util/Color';
import SIZE from './util/Size';
import STRINGS from './util/Strings';
import WelcomeContainer from './WelcomeContainer';
import WelcomeTextInput from './ecq/WelcomeTextInput';
import WelcomeButton from './ecq/WelcomeButton';

export default class WelcomeRegisterViaEmailScreen extends Component {
    static navigationOptions = {
        title: SCREEN.REGISTER_EMAIL,
        header: {
            visible: false
        }
    };
    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer bottomContainer={
              <WelcomeRegisterViaEmailBottomContainer
                navigation={navigation}/> }/>
        );
    }
}

class WelcomeRegisterViaEmailBottomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      confirmPassword:'',
    }
  }

  _onRegisterPressed() {
    console.log('_onRegisterPressed')
  }

  render() {
    const navigation = this.props.navigation;
    return (
        <View style={styles.containerBottom}>
          <View style={styles.page}>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ emailAddress: text })}
                value={ this.state.emailAddress }
                placeholder={ STRINGS.placeHolderEmailAddress }
                keyboardType='email-address'
                returnKeyType='next'
            />
            <View style={styles.space}/>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ password: text })}
                value={ this.state.password }
                placeholder={ STRINGS.placeHolderPassword }
                secureTextEntry={ true }
                returnKeyType='next'
            />
            <View style={styles.space}/>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ confirmPassword: text })}
                value={ this.state.confirmPassword }
                placeholder={ STRINGS.placeHolderConfirmPassword }
                secureTextEntry={ true }
                returnKeyType='done'
            />
            <View style={styles.space}/>
            <WelcomeButton
                onPress={this._onRegisterPressed.bind(this)}
                text={STRINGS.REGISTER}/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    containerBottom: {
        flex: 3.5,
        backgroundColor: 'transparent',
    },
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: COLOR.WELCOME_BACKGROUND_BOTTOM_CONTAINER,
        marginTop: SIZE.WELCOME_TABBAR_HEIGHT,
        padding: 20,
    },
    space: {
        height: SIZE.WELCOME_HEIGHT_SPACE,
    },
});