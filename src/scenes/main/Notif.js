/**
 * Created by michael on 5/16/2017.
 */
import React, {Component} from "react";
import {FlatList, Text, TouchableHighlight, View, Image} from "react-native";
import THEME from "../../style/Theme";
import CONFIG from "../../Constants";
import SCREEN from "../../utils/ScreenHelper";

import StyImages from "../../style/Image";
import StyText from "../../style/Text";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeNotif extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONFIG.appName,
        headerTitleStyle: {
            color: THEME.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: THEME.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={THEME.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'Notif',
    });

    constructor(props) {
        super(props);

        let data = [];
        for (i = 0; i < 20; i++) {
            data.push({
                key: i,
                // message: i + ' We are often asked what makes a brilliant text message. There is no right answer to this as there is no such thing as a size that fits all, but there are SMS templates that have proven to be effective for businesses. All of them share the following elements: powerful call-to-action triggers; the sender’s ID, name and phone number; and, occasionally, a short link to the sender’s website. ',
                message: i + ' Brilliant text message.',
                profilePictureUrl: 'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
            });
        }

        this.state = {
            data: data,
        }
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{flex: 1, marginBottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                    {/* Profile Picture */}
                    <Image style={StyImages.profilePictureNotif} source={{uri: item.profilePictureUrl}}/>
                    {/* Message */}
                    <View style={{flex: 1, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
                        <Text style={StyText.title}>{item.message}</Text>
                    </View>
                    {/* Image */}
                    <Image style={StyImages.imageNotif} source={{uri: item.imageUrl}}/>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10, paddingRight: 10, paddingLeft: 10}}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}