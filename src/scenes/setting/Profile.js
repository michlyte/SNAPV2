/**
 * Created by michael on 5/19/2017.
 */
import React, {Component, PropTypes} from "react";
import {Animated, Image, ScrollView, Text, View} from "react-native";
import CONSTANTS from "../../Constants";
import THEME from "../../style/Theme";

export default class Profile extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTintColor: CONSTANTS.theme.navBar_tintColor,
        headerTitleStyle: {
            color: CONSTANTS.theme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>

        </View>,
    });

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            data: {
                displayName: 'mike',
                email: 'michaelhalim@ecquaria.com',
                mobileNo: '085624233445',
                userPictureUrl: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
            },
        }
    }

    render() {
        return (
            <ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {y: this.state.scrollY}
                        }
                    }]
                )}>
                <View style={{
                    flex: 1,
                    height: 150,
                    marginTop: 30,
                    marginBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{uri: this.state.data.userPictureUrl}}
                           style={{width: 140, height: 140, borderRadius: 70}}/>
                </View>

                <View
                    style={{
                        height: 1,
                        backgroundColor: THEME.line,
                        marginBottom: 20,
                        marginLeft: 25,
                        marginRight: 25
                    }}/>
                {/*<Text style={{color: THEME.line, fontSize: 20, marginBottom: 15, marginLeft: 25, marginRight: 25}}>Your*/}
                {/*Bio</Text>*/}

                <ProfileContent title={'DisplayName'} content={this.state.data.displayName}/>
                <ProfileContent title={'Email'} content={this.state.data.email}/>
                <ProfileContent title={'MobileNo'} content={this.state.data.mobileNo}/>
            </ScrollView>
        );
    }
}

class ProfileContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
            }}>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 15, fontStyle: 'italic'}}>{this.props.title}</Text>
                </View>
                <View style={{width: 10}}/>
                <View style={{flexDirection: 'row', flex: 2}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{this.props.content}</Text>
                </View>
            </View>
        );
    }
}

ProfileContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};