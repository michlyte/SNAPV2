import React, {Component} from "react";
import {
    Alert,
    AsyncStorage,
    Image,
    NativeModules,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import {TabBar, TabViewAnimated} from "react-native-tab-view";
import {NavigationActions} from "react-navigation";
import PropTypes from "prop-types";
import FCM from "react-native-fcm";
import FBSDK from "react-native-fbsdk";

import CONSTANTS, {RestAPI, WelcomeTheme} from "../../Constants";

import COLOR from "../../styles/Color";
import SIZE from "../../styles/Size";
import {welcomeStyle} from "../../styles/Style";

import ASSET_HELPER from "../../utils/AssetHelper";
import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import DUMMY_HELPER from "../../utils/DummyHelper";
import PARAM_HELPER from "../../utils/ParamHelper";
import {isValidEmail, isValidPassword} from "../../utils/ValidationHelper";
import {Env} from "../../utils/EnumHelper";

import WelcomeTextInput from "../../components/WelcomeTextInput";
import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import {LoginRequestClass} from "../../models/RequestAPI";
import {User} from "../../models/User";

import Icon from "react-native-vector-icons/FontAwesome";

const {TwitterSignin} = NativeModules;

const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);

        this._welcomeContainer = null;
    }

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

    setLoading = (loading) => {
        this._welcomeContainer.setLoading(loading);
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                ref={(component) => {
                    this._welcomeContainer = component
                }}
                bottomContainer={
                    <WelcomeBottomContainer
                        navigation={navigation}
                        setLoading={this.setLoading}
                    />
                }
                navigation={navigation}
                goBack={() => {
                }}
                isBackButtonShowed={false}
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
                       indicatorStyle={{backgroundColor: WelcomeTheme.tabBar_welcome_indicatorColor}}
                       labelStyle={{color: WelcomeTheme.tabBar_welcome_tintColor}}
                       style={{backgroundColor: WelcomeTheme.tabBar_welcome_backgroundColor}}/>
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <RegisterTab
                    navigation={this.props.navigation}
                />;
            case '2':
                return <LoginTab
                    navigation={this.props.navigation}
                    setLoading={this.props.setLoading}
                />;
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

WelcomeBottomContainer.propTypes = {
    navigation: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
};

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

        this._emailTextField = null;
        this._passwordTextField = null;
        this.onFacebookPressed = onFacebookPressed.bind(this);
        this.onTwitterPressed = onTwitterPressed.bind(this);

        // Check buildType
        let tempEmailAddress = '';
        let tempPassword = '';
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
            case Env.DEV:
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

    _navigateToMainScreen = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: SCREEN_HELPER.MAIN})
            ]
        });
        this.props.navigation.dispatch(resetAction);
        return true;
    };

    _makeRequestLogin = async (email, password, imei, pushRegId, deviceType) => {
        this.props.setLoading(true);
        const loginRequest = new LoginRequestClass(email, password, imei, pushRegId, deviceType);
        try {
            let response = await fetch(CONSTANTS.baseUrl + RestAPI.login.url, {
                method: RestAPI.login.method,
                headers: RestAPI.login.headers,
                body: JSON.stringify(loginRequest),
            });

            this.props.setLoading(false);
            console.log(response);

            return await response.json();
        } catch (error) {
            this.props.setLoading(false);
            console.error(error);
        }
    };

    _onLoginPressed = () => {
        this._emailTextField.setError(false, '');
        this._passwordTextField.setError(false, '');

        const emailAddress = this.state.emailAddress;
        const password = this.state.password;

        if (!emailAddress || emailAddress.length === 0) {
            this._emailTextField.setError(true, STRING_HELPER.errorMsgEmailAddressRequired);
        } else if (!isValidEmail(emailAddress)) {
            this._emailTextField.setError(true, STRING_HELPER.errorMsgEmailAddressInvalid);
        } else if (!password || password.length === 0) {
            this._passwordTextField.setError(true, STRING_HELPER.errorMsgPasswordRequired);
        } else if (!isValidPassword(password)) {
            this._passwordTextField.setError(true, STRING_HELPER.errorMsgPasswordTooShort);
        } else {
            switch (CONSTANTS.Env) {
                case Env.DEV_DUMMY:
                    AsyncStorage.setItem(PARAM_HELPER.user, JSON.stringify(DUMMY_HELPER.user), () => {
                        AsyncStorage.getItem(PARAM_HELPER.user, (err, result) => {
                            let userJson = JSON.parse(result);

                            if (userJson.login) {
                                this._navigateToMainScreen();
                            }
                        })
                    });
                    break;
                case Env.DEV:
                case Env.PROD:
                    FCM.getFCMToken()
                        .then(token => {
                            this._makeRequestLogin(
                                emailAddress,
                                password,
                                CONSTANTS.uniqueID,
                                token,
                                Platform.OS
                            )
                                .then((responseJson) => {
                                    console.log(responseJson);
                                    if (responseJson.meta.status === RestAPI.CODE_200) {
                                        let user = new User(
                                            responseJson.data.userId,
                                            email,
                                            responseJson.data.displayName,
                                            responseJson.data.authKey,
                                            responseJson.data.maxAttachment,
                                            responseJson.data.deviceUserId,
                                            true
                                        );

                                        AsyncStorage.setItem(PARAM_HELPER.user, JSON.stringify(user), () => {
                                            AsyncStorage.getItem(PARAM_HELPER.user, (err, result) => {
                                                let userJson = JSON.parse(result);

                                                if (userJson.login) {
                                                    this._navigateToMainScreen();
                                                }
                                            })
                                        });
                                    } else {
                                        Alert.alert(
                                            STRING_HELPER.TITLE_WARNING,
                                            responseJson.meta.message
                                        )
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        })
                        .catch((error) => {
                            this.props.setLoading(false);
                            console.error(error);
                        });
                    break;
            }
        }
    };

    _onForgotPressed = () => {
        const {navigate} = this.props.navigation;
        navigate(SCREEN_HELPER.FORGOT);
    };

    onEmailSubmitEditing = () => {
        this._passwordTextField.focus();
    };

    render() {
        return (
            <View style={ styles.page }>
                <View>
                    <WelcomeTextInput
                        ref={(component) => {
                            this._emailTextField = component;
                        }}
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRING_HELPER.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                        onSubmitEditing={this.onEmailSubmitEditing}
                    />
                    <View style={ styles.space }/>
                    <WelcomeTextInput
                        ref={(component) => {
                            this._passwordTextField = component;
                        }}
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRING_HELPER.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
                        onSubmitEditing={this._onLoginPressed}
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
                    <Text style={{color: WelcomeTheme.text_welcome_tintColor}}>
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

LoginTab.propTypes = {
    navigation: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
};

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
                    <Text style={{color: WelcomeTheme.text_welcome_tintColor}}>
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
                            <View style={welcomeStyle.divider}/>
                            <Icon name="check" size={20} color={WelcomeTheme.button_text_welcome_tintColor}/>
                        </View>
                    </TouchableHighlight>

                    <View style={ styles.space }/>
                </View>
            </View>
        );
    }
}

RegisterTab.propTypes = {
    navigation: PropTypes.object.isRequired,
};

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