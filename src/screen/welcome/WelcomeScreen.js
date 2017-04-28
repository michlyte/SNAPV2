import React, {
    Component,
} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    NativeModules,
} from 'react-native';
import {
    TabViewAnimated,
    TabBar
} from 'react-native-tab-view';
import {NavigationActions} from 'react-navigation'
import FBSDK from 'react-native-fbsdk';
import IMAGES from '../../Images';
import COLOR from '../../util/Color';
import THEME from '../../util/Theme';
import SIZE from '../../util/Size';
import STRINGS from '../../util/Strings';
import PROPERTIES from '../../util/Properties';
import SCREEN from '../../util/Screen';
import STYLE from '../../util/Style';
import CONFIG from '../../util/Config';
import WelcomeTextInput from '../../ecq/WelcomeTextInput';
import WelcomeContainer from './WelcomeContainer';
import WelcomeButton from '../../ecq/WelcomeButton';

import Icon from 'react-native-vector-icons/FontAwesome';

const {TwitterSignin} = NativeModules;

const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class WelcomeScreen extends Component {
    componentWillMount() {
        if (CONFIG.isLoggedIn) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: SCREEN.MAIN})
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
                       indicatorStyle={{backgroundColor: THEME.tabBar_welcome_indicatorColor}}
                       labelStyle={{color: THEME.tabBar_welcome_tintColor}}
                       style={{backgroundColor: THEME.tabBar_welcome_backgroundColor}}/>
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
function facebookPressed() {
    console.log('facebookPressed');
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
    TwitterSignin.logIn(PROPERTIES.TWITTER_CONSUMER_KEY, PROPERTIES.TWITTER_CONSUMER_SECRET, (error, loginData) => {
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
            password: tempPassword,
        };
    }

    _onLoginPressed() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: SCREEN.MAIN})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    _onForgotPressed() {
        console.log('_onForgotPressed');
        const {navigate} = this.props.navigation;
        navigate(SCREEN.FORGOT);
    }

    render() {
        return (
            <View style={ styles.page }>
                <View>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({emailAddress: text})}
                        value={ this.state.emailAddress }
                        placeholder={ STRINGS.placeHolderEmailAddress }
                        keyboardType='email-address'
                        returnKeyType='next'
                    />
                    <View style={ styles.space }/>
                    <WelcomeTextInput
                        onChangeText={(text) => this.setState({password: text})}
                        value={ this.state.password }
                        placeholder={ STRINGS.placeHolderPassword }
                        secureTextEntry={ true }
                        returnKeyType='done'
                    />
                    <View style={ styles.space }/>
                    <WelcomeButton
                        onPress={this._onLoginPressed.bind(this)}
                        text={STRINGS.LOGIN}/>
                    <View style={ styles.space }/>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{STRINGS.forgotYourLoginDetails} </Text>
                        <TouchableHighlight onPress={this._onForgotPressed.bind(this)}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{STRINGS.getHelpSigningIn}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{color: THEME.text_welcome_tintColor}}>
                        or login using
                    </Text>

                    <View style={{height: 20}}/>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <SocialContainer
                            onPress={ facebookPressed.bind(this) }
                            backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
                            text={ STRINGS.FACEBOOK }
                            icon={ IMAGES.ic_facebook }
                            socialHeight={ SIZE.WELCOME_BUTTON_CONTAINER_SOCIAL_HEIGHT }
                            fontSize={ 14 }/>

                        <View style={{width: 20}}/>

                        <SocialContainer
                            onPress={ onTwitterPressed.bind(this) }
                            backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
                            text={ STRINGS.TWITTER }
                            icon={ IMAGES.ic_twitter }
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
    _onEmailPressed() {
        const {navigate} = this.props.navigation;
        navigate(SCREEN.REGISTER_EMAIL);
    }

    render() {
        return (
            <View style={ styles.page }>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <SocialContainer
                            onPress={ facebookPressed.bind(this) }
                            backgroundColor={ COLOR.WELCOME_FACEBOOK_BACKGROUND_COLOR }
                            text={ STRINGS.REGISTER_VIA_FACEBOOK }
                            icon={ IMAGES.ic_facebook }
                            socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
                            fontSize={ 18 }/>
                    </View>
                    <View style={ styles.space }/>
                    <View style={{flexDirection: 'row'}}>
                        <SocialContainer
                            onPress={ onTwitterPressed.bind(this) }
                            backgroundColor={ COLOR.WELCOME_TWITTER_BACKGROUND_COLOR }
                            text={ STRINGS.REGISTER_VIA_TWITTER }
                            icon={ IMAGES.ic_twitter }
                            socialHeight={ SIZE.WELCOME_BUTTON_HEIGHT }
                            fontSize={ 18 }/>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{color: THEME.text_welcome_tintColor}}>
                        or sign up using
                    </Text>

                    <View style={{height: 20}}/>

                    <TouchableHighlight
                        onPress={ this._onEmailPressed.bind(this) }>
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
                            <Icon name="check" size={20} color={THEME.button_text_welcome_tintColor}/>
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