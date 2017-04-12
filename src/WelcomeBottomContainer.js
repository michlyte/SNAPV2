import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {
  TabViewAnimated,
  TabBar
} from 'react-native-tab-view';
import FBSDK from 'react-native-fbsdk';

import IMAGES from './Images';
import COLOR from './Color';
import SIZE from './Size';
import STRINGS from './Strings';
import PROPERTIES from './Properties';

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

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

// Facebook SDK
function facebookPressed() {
    console.log('facebookPressed')
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        function(result) {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('Login success with permissions: '
                    +result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        // Fetching facebook data
                        let accessToken = data.accessToken
                        console.log(accessToken.toString())

                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log('Error fetching data: ' + error.toString())
                            } else {
                                console.log('Success fetching data: ')
                                console.log(result)
                            }
                        }

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name'
                                    }
                                }
                            },
                            responseInfoCallback
                        );

                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start()
                    }
                )
            }
        },
        function(error) {
            console.log('Login fail with error: ' + error);
        }
    );
}

class LoginTab extends Component {
  constructor(props) {
    super(props);

    // Check buildType
    let tempEmailAddress = '';
    let tempPassword = '';
    switch (PROPERTIES.BUILD) {
      case PROPERTIES.BUILD_TYPE.DEVELOPMENT_DUMMY:
        tempEmailAddress = 'mikefla10@gmail.com';
        tempPassword = 'password$1';
        break;
      default:
        break;
    }

    this.state = {
        emailAddress: tempEmailAddress,
        emailAddressBorder: 'transparent',
        password: tempPassword,
        passwordBorder: 'transparent',
    };
  }

  _onLoginPressed() {
    const { navigate } = this.props.navigation;
    navigate('Chat');
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
            placeholder={ STRINGS.placeHolderEmailAddress }
            keyboardType='email-address'
            returnKeyType='next'
          />
          <View style={ styles.space }/>
          <WelcomeTextInput
            onChangeText={(text) => this.setState({ password: text })}
            value={ this.state.password }
            placeholder={ STRINGS.placeHolderPassword }
            secureTextEntry={ true }
            returnKeyType='done'
          />
          <View style={ styles.space }/>
          <TouchableHighlight
            style={ styles.welcomeActionButton }
            onPress={ this._onLoginPressed.bind(this) }>
            <Text
              style={ styles.welcomeActionButtonText }>
              { STRINGS.LOGIN }
            </Text>
          </TouchableHighlight>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: COLOR.WELCOME_TEXT_TINT_COLOR }}>
            or login using
          </Text>

          <View style={{ height: 20 }}/>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center' }}>

            <SocialContainer
              onPress={ facebookPressed.bind(this) }
              backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
              text={ STRINGS.FACEBOOK }
              icon={ IMAGES.ICON_FACEBOOK }
              socialHeight={ SIZE.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
              fontSize={ 14 }/>

            <View style={{ width: 20 }}/>

            <SocialContainer
              onPress={ this._onTwitterPressed.bind(this) }
              backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
              text={ STRINGS.TWITTER }
              icon={ IMAGES.ICON_TWITTER }
              socialHeight={ SIZE.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
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
    const { navigate } = this.props.navigation;
    navigate('RegisterEmail');
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
              onPress={ facebookPressed.bind(this) }
              backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
              text={ STRINGS.REGISTER_VIA_FACEBOOK }
              icon={ IMAGES.ICON_FACEBOOK }
              socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
              fontSize={ 18 } />
          </View>
          <View style={ styles.space }/>
          <View style={{ flexDirection: 'row' }}>
            <SocialContainer
              onPress={ this._onTwitterPressed.bind(this) }
              backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
              text={ STRINGS.REGISTER_VIA_TWITTER }
              icon={ IMAGES.ICON_TWITTER }
              socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
              fontSize={ 18 } />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: COLOR.WELCOME_TEXT_TINT_COLOR }}>
            or sign up using
          </Text>

          <View style={{ height: 20 }}/>

          <TouchableHighlight
            onPress={ this._onEmailPressed.bind(this) }>
            <Text style={{
              color: COLOR.GREEN,
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
    backgroundColor: COLOR.GREEN,
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
    backgroundColor: COLOR.WELCOME_TWITTER_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtonFacebook: {
    flex: 1,
    backgroundColor: COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeTextInput: {
    height: SIZE.WELCOME_BUTTON_HEIGHT,
    backgroundColor: 'white'
  },
  welcomeActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.GREEN,
    height: SIZE.WELCOME_BUTTON_HEIGHT,
  },
  welcomeActionButtonText: {
    color: COLOR.WELCOME_BUTTON_TINT_COLOR,
    fontSize: 22,
  },
});
