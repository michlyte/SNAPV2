import React, {Component} from "react";
import {Image, NativeModules, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {TabBar, TabViewAnimated} from "react-native-tab-view";
import {NavigationActions} from "react-navigation";
import FBSDK from "react-native-fbsdk";

import CONSTANTS from "../../Constants";

import COLOR from "../../styles/Color";
import SIZE from "../../styles/Size";
import STYLE from "../../styles/Style";

import ASSET_HELPER from "../../utils/AssetHelper";
import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import DUMMY_HELPER from "../../utils/DummyHelper";
import {Env} from "../../utils/EnumHelper";

import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import Icon from "react-native-vector-icons/FontAwesome";

const {TwitterSignin} = NativeModules;

const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class WelcomeScreen extends Component {
    componentWillMount() {
        if (CONSTANTS.isLoggedIn) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: SCREEN_HELPER.MAIN})
                ]
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeBottomContainer
                        navigation={navigation}/> }
            />
        );
    }
}

class WelcomeBottomContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                {key: '1', title: 'Register'},
                {key: '2', title: 'Login'},
            ],
        };
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar {...props}
                       indicatorStyle={{backgroundColor: CONSTANTS.theme.tabBar_welcome_indicatorColor}}
                       labelStyle={{color: CONSTANTS.theme.tabBar_welcome_tintColor}}
                       style={{backgroundColor: CONSTANTS.theme.tabBar_welcome_backgroundColor}}/>
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <RegisterTab navigation={this.props.navigation}/>;
            case '2':
                return <LoginTab navigation={this.props.navigation}/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <TabViewAnimated
                style={styles.containerBottom}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
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
                    height: this.props.socialHeight
                }}
                onPress={ this.props.onPress }>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: this.props.backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{
                            width: this.props.socialHeight,
                            height: this.props.socialHeight
                        }}
                        source={ this.props.icon }/>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: this.props.fontSize
                            }}>
                            { this.props.text }
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

// Facebook SDK
function onFacebookPressed() {
    console.log('onFacebookPressed');
    // Attempt login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        function (result) {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('Login success with permissions: '
                    + result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        // Fetching facebook data
                        let accessToken = data.accessToken;
                        console.log(accessToken.toString());

                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log('Error fetching data: ' + error.toString())
                            } else {
                                console.log('Success fetching data: ');
                                console.log(result)
                            }
                        };

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
        function (error) {
            console.log('Login fail with error: ' + error);
        }
    );
}

// Twitter SDK
function onTwitterPressed() {
    TwitterSignin.logIn(CONSTANTS.TWITTER_CONSUMER_KEY, CONSTANTS.TWITTER_CONSUMER_SECRET, (error, loginData) => {
        if (!error) {
            console.log('Success fetching data: ');
            console.log(loginData);
        } else {
            console.log('Invalid login', 'Unable to login');
        }
    });
}

class LoginTab extends Component {
    constructor(props) {
        super(props);

        this.onFacebookPressed = onFacebookPressed.bind(this);
        this.onTwitterPressed = onTwitterPressed.bind(this);

        // Check buildType
        let tempEmailAddress = '';
        let tempPassword = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                tempEmailAddress = DUMMY_HELPER.emailAddress;
                tempPassword = DUMMY_HELPER.password;
                break;
            default:
                break;
        }

        this.state = {
            emailAddress: tempEmailAddress,
            password: tempPassword,
        };
    }

    _onLoginPressed = () => {
        const emailAddress = this.state.emailAddress;
        const password = this.state.password;
        let cancel = false;

        if (!emailAddress || emailAddress.length === 0) {
            cancel = true;
        } else if (!password || password.length === 0) {
            cancel = true;
        }

        if (cancel) {
            console.log("Cancel is true");
        } else {
            // switch (CONSTANTS.BUILD) {
            //     case CONSTANTS.BUILD_TYPE.DEVELOPMENT_DUMMY:
            //         let userInfo = [
            //             [PARAM_HELPER.userId, "0"],
            //             [PARAM_HELPER.email, this.state.emailAddress],
            //             [PARAM_HELPER.isLoggedIn, "true"],
            //         ];
            //         SESSION_HELPER.multiSet(userInfo);
            //         break;
            //     case CONSTANTS.BUILD_TYPE.DEVELOPMENT:
            //         break;
            //     case CONSTANTS.BUILD_TYPE.PRODUCTION:
            //         break;
            // }

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: SCREEN_HELPER.MAIN})
                ]
            });
            this.props.navigation.dispatch(resetAction)
        }
    };

    _onForgotPressed = () => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.FORGOT);
    };

    render() {
        return (
            <View style={ styles.page }>
                <View>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                    />
                    <View style={ styles.space }/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRING_HELPER.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
                    />
                    <View style={ styles.space }/>
                    <WelcomeButton
                        onPress={this._onLoginPressed}
                        text={STRING_HELPER.LOGIN}/>
                    <View style={ styles.space }/>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{STRING_HELPER.forgotYourLoginDetails} </Text>
                        <TouchableHighlight onPress={this._onForgotPressed}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{STRING_HELPER.getHelpSigningIn}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{color: CONSTANTS.theme.text_welcome_tintColor}}>
                        or login using
                    </Text>

                    <View style={{height: 20}}/>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <SocialContainer
                            onPress={ this.onFacebookPressed }
                            backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
                            text={ STRING_HELPER.FACEBOOK }
                            icon={ ASSET_HELPER.ic_facebook }
                            socialHeight={ SIZE.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
                            fontSize={ 14 }/>

                        <View style={{width: 20}}/>

                        <SocialContainer
                            onPress={ this.onTwitterPressed }
                            backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
                            text={ STRING_HELPER.TWITTER }
                            icon={ ASSET_HELPER.ic_twitter }
                            socialHeight={ SIZE.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
                            fontSize={ 14 }/>

                    </View>
                    <View style={ styles.space }/>
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);

        this.onFacebookPressed = onFacebookPressed.bind(this);
        this.onTwitterPressed = onTwitterPressed.bind(this);
    }

    _onEmailPressed = () => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.REGISTER_EMAIL);
    };

    render() {
        return (
            <View style={ styles.page }>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <SocialContainer
                            onPress={ this.onFacebookPressed }
                            backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
                            text={ STRING_HELPER.REGISTER_VIA_FACEBOOK }
                            icon={ ASSET_HELPER.ic_facebook }
                            socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
                            fontSize={ 18 }/>
                    </View>
                    <View style={ styles.space }/>
                    <View style={{flexDirection: 'row'}}>
                        <SocialContainer
                            onPress={ this.onTwitterPressed }
                            backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
                            text={ STRING_HELPER.REGISTER_VIA_TWITTER }
                            icon={ ASSET_HELPER.ic_twitter }
                            socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
                            fontSize={ 18 }/>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{color: CONSTANTS.theme.text_welcome_tintColor}}>
                        or sign up using
                    </Text>

                    <View style={{height: 20}}/>

                    <TouchableHighlight
                        onPress={ this._onEmailPressed }>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                color: COLOR.GREEN,
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>
                                Email
                            </Text>
                            <View style={STYLE.divider}/>
                            <Icon name="check" size={20} color={CONSTANTS.theme.button_text_welcome_tintColor}/>
                        </View>
                    </TouchableHighlight>

                    <View style={ styles.space }/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBottom: {
        flex: 3.5,
        backgroundColor: 'transparent'
    },
    page: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: COLOR.WELCOME_BACKGROUND_BOTTOM_CONTAINER,
        padding: 20,
    },
    space: {
        height: SIZE.WELCOME_HEIGHT_SPACE,
    },
});