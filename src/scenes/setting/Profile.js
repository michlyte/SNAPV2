/**
 * Created by michael on 5/19/2017.
 */
import React, {Component, PropTypes} from "react";
import {Animated, Button, Image, ScrollView, Text, View} from "react-native";
import ImagePicker from "react-native-image-picker";
import ImageCropPicker from "react-native-image-crop-picker";

import CONSTANTS from "../../Constants";
import THEME from "../../styles/Theme";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import SESSION_HELPER from "../../utils/SessionHelper";

export default class Profile extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: SCREEN_HELPER.PROFILE,
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

    _onChangePicturePressed = () => {
        // ImageCropPicker.openPicker({
        //     width: 400,
        //     height: 400,
        //     cropping: true
        // }).then(image => {
        //     console.log(image);
        // });

        // More info on all the options is below in the README...just some common use cases shown here
        let options = {
            title: 'Select Avatar',
            customButtons: [
                // {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            // else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            // }
            else {
                // let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = {uri: 'data:image/jpeg;base64,' + response.data};
                let source = 'data:image/jpeg;base64,' + response.data;

                // Crop feature
                ImageCropPicker.openCropper({
                    path: "file://" + response.path,
                    width: 400,
                    height: 400
                }).then(image => {
                    console.log(image);
                });

                // const newData = this.state.data;
                // newData.userPictureUrl = source;
                // this.setState({
                //     data: newData
                // });
            }
        });
    };

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
                    marginTop: 25,
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{uri: this.state.data.userPictureUrl}}
                           style={{width: 140, height: 140, borderRadius: 70}}/>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        onPress={this._onChangePicturePressed}
                        title="Change Avatar"
                        color={THEME.navBar_backgroundColor}
                    />
                </View>

                <View
                    style={{
                        height: 1,
                        backgroundColor: THEME.line,
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 25,
                        marginRight: 25
                    }}/>

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