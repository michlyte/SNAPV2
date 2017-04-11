import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import Images from './Images';
import Color from './Color';
import Size from './Size';
import Strings from './Strings';

export default class WelcomeBottomContainer extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Register' },
      { key: '2', title: 'Login' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props}
      indicatorStyle={ styles.indicator }
      labelStyle={ styles.label }
      style={ styles.tabBar } />
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <RegisterTab navigation={this.props.navigation} />
    case '2':
      return <LoginTab navigation={this.props.navigation} />
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={this.props.styleContainerBottom}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

class WelcomeTextInput extends Component {
  render() {
    return (
      <TextInput
        style={ styles.welcomeTextInput }
        onChangeText={ this.props.onChangeText }
        value={ this.props.value }
        placeholder={ this.props.placeholder }
        keyboardType={ this.props.keyboardType }
        secureTextEntry={ this.props.secureTextEntry }
        clearButtonMode='while-editing'
        underlineColorAndroid='transparent'
        onSubmitEditing={ this.props.onSubmitEditing }
        returnKeyType={ this.props.returnKeyType }
      />
    );
  }
}

class SocialContainer extends Component {
  render() {
    return (
      <TouchableHighlight
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          height: this.props.socialHeight }}
        onPress={ this.props.onPress }>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: this.props.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center' }}>
          <Image
            style={{
              width: this.props.socialHeight,
              height: this.props.socialHeight }}
            source={ this.props.icon }/>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                color: 'white',
                fontSize: this.props.fontSize }}>
              { this.props.text }
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

SocialContainer.propTypes = {
  backgroundColor: React.PropTypes.string,
  text: React.PropTypes.string,
  fontSize: React.PropTypes.number,
  socialHeight: React.PropTypes.number,
};

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: 'mikefla10@gmail.com',
      emailAddressBorder: 'transparent',
      password: 'password$1',
      passwordBorder: 'transparent',
    };
  }

  _onLoginPressed() {
    // console.log('Login is pressed.');
    const { navigate } = this.props.navigation;
    navigate('Chat');
  }

  _onFacebookPressed() {
    console.log('Facebook is pressed.');
  }

  _onTwitterPressed() {
    console.log('Twitter is pressed.');
  }

  render() {
    return (
      <View style={ styles.page }>
        <View>
          <WelcomeTextInput
            onChangeText={(text) => this.setState({ emailAddress: text })}
            value={ this.state.emailAddress }
            placeholder={ Strings.placeHolderEmailAddress }
            keyboardType='email-address'
            returnKeyType='next'
          />
          <View style={ styles.space }/>
          <WelcomeTextInput
            onChangeText={(text) => this.setState({ password: text })}
            value={ this.state.password }
            placeholder={ Strings.placeHolderPassword }
            secureTextEntry={ true }
            returnKeyType='done'
          />
          <View style={ styles.space }/>
          <TouchableHighlight
            style={ styles.welcomeActionButton }
            onPress={ this._onLoginPressed.bind(this) }>
            <Text
              style={ styles.welcomeActionButtonText }>
              { Strings.LOGIN }
            </Text>
          </TouchableHighlight>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: Color.WELCOME_TEXT_TINT_COLOR }}>
            or login using
          </Text>

          <View style={{ height: 20 }}/>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center' }}>

            <SocialContainer
              onPress={ this._onFacebookPressed }
              backgroundColor={ Color.WELCOME_FACEBOOK_BACKGROUND_COLOR }
              text={ Strings.FACEBOOK }
              icon={ Images.ICON_FACEBOOK }
              socialHeight={ Size.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
              fontSize={ 14 }/>

            <View style={{ width: 20 }}/>

            <SocialContainer
              onPress={ this._onTwitterPressed }
              backgroundColor={ Color.WELCOME_TWITTER_BACKGROUND_COLOR }
              text={ Strings.TWITTER }
              icon={ Images.ICON_TWITTER }
              socialHeight={ Size.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
              fontSize={ 14 } />

          </View>
          <View style={ styles.space }/>
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  _onEmailPressed() {
    console.log("Email is pressed.");
  }

  _onFacebookPressed() {
    console.log("Facebook is pressed.");
  }

  _onTwitterPressed() {
    console.log("Twitter is pressed.");
  }

  render() {
    return (
      <View style={ styles.page }>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <SocialContainer
              onPress={ this._onFacebookPressed }
              backgroundColor={ Color.WELCOME_FACEBOOK_BACKGROUND_COLOR }
              text={ Strings.REGISTER_VIA_FACEBOOK }
              icon={ Images.ICON_FACEBOOK }
              socialHeight={ Size.WELCOME_BUTTON_HEIGHT }
              fontSize={ 18 } />
          </View>
          <View style={ styles.space }/>
          <View style={{ flexDirection: 'row' }}>
            <SocialContainer
              onPress={ this._onTwitterPressed }
              backgroundColor={ Color.WELCOME_TWITTER_BACKGROUND_COLOR }
              text={ Strings.REGISTER_VIA_TWITTER }
              icon={ Images.ICON_TWITTER }
              socialHeight={ Size.WELCOME_BUTTON_HEIGHT }
              fontSize={ 18 } />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: Color.WELCOME_TEXT_TINT_COLOR }}>
            or sign up using
          </Text>

          <View style={{ height: 20 }}/>

          <TouchableHighlight
            onPress={ this._onEmailPressed.bind(this) }>
            <Text style={{
              color: Color.GREEN,
              fontSize: 18,
              fontWeight: 'bold' }}>
              Email
            </Text>
          </TouchableHighlight>

          <View style={ styles.space }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: Color.GREEN,
  },
  label: {
    color: 'white',
  },
  space: {
    height: 10,
  },
  containerSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  containerButtonTwitter: {
    flex: 1,
    backgroundColor: Color.WELCOME_TWITTER_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtonFacebook: {
    flex: 1,
    backgroundColor: Color.WELCOME_FACEBOOK_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeTextInput: {
    height: Size.WELCOME_BUTTON_HEIGHT,
    backgroundColor: 'white'
  },
  welcomeActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.GREEN,
    height: Size.WELCOME_BUTTON_HEIGHT,
  },
  welcomeActionButtonText: {
    color: Color.WELCOME_BUTTON_TINT_COLOR,
    fontSize: 22,
  },
});
