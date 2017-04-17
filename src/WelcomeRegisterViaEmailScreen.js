/**
 * Created by michael on 4/13/2017.
 */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import PROPERTIES from './util/Properties';
import SCREEN from './util/Screen';
import STYLE from './util/Style';
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
      switch (PROPERTIES.BUILD) {
          case PROPERTIES.BUILD_TYPE.DEVELOPMENT_DUMMY:
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

  _onRegisterPressed() {
      const { navigate } = this.props.navigation;
      navigate(SCREEN.VERIFICATION_CODE, { email: this.state.emailAddress });
  }

  render() {
    return (
        <View style={STYLE.containerBottom}>
          <View style={STYLE.page}>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ emailAddress: text })}
                value={ this.state.emailAddress }
                placeholder={ STRINGS.placeHolderEmailAddress }
                keyboardType='email-address'
                returnKeyType='next'
            />
            <View style={STYLE.space}/>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ password: text })}
                value={ this.state.password }
                placeholder={ STRINGS.placeHolderPassword }
                secureTextEntry={ true }
                returnKeyType='next'
            />
            <View style={STYLE.space}/>
            <WelcomeTextInput
                onChangeText={(text) => this.setState({ confirmPassword: text })}
                value={ this.state.confirmPassword }
                placeholder={ STRINGS.placeHolderConfirmPassword }
                secureTextEntry={ true }
                returnKeyType='done'
            />
            <View style={STYLE.space}/>
            <WelcomeButton
                onPress={this._onRegisterPressed.bind(this)}
                text={STRINGS.REGISTER}/>
          </View>
        </View>
    );
  }
}