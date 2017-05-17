/**
 * Created by michael on 5/16/2017.
 */
import React, {Component} from "react";
import {FlatList, Image, Text, TouchableHighlight, View} from "react-native";
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

        /*
         *  STRUCTURE
         *  "notificationId":440,
         *  "body":"egp_ecquaria commented on your case : test title",
         *  "caseTitle":"test title",
         *  "caseId":426,
         *  "friendPictureUrl":null,
         *  "attachmentUrlThumb":"http://192.168.0.19/html/epartic_image/IMG_20160412_150544.thumb.jpg",
         *  "notificationDate":1460483504000
         */

        let data = [];
        for (i = 0; i < 20; i++) {
            if (i == 2) {
                data.push({
                    key: i,
                    notificationId: i,
                    body: 'egp_ecquaria commented on your case : test title.',
                    caseTitle: 'test title',
                    caseId: i,
                    friendPictureUrl: null,
                    attachmentUrlThumb: 'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                    notificationDate: '1460483504000',
                });
                continue;
            }

            data.push({
                key: i,
                notificationId: i,
                body: 'egp_ecquaria commented on your case : test title.',
                caseTitle: 'test title',
                caseId: i,
                friendPictureUrl: 'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                attachmentUrlThumb: 'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                notificationDate: '1460483504000',
            });
        }

        this.state = {
            data: data,
        }
    }

    _renderItem = ({item, index}) => {
        let fpUrl = (item.friendPictureUrl === null ? 'http://lifeinvistaprint.com/wp-content/uploads/2015/04/null.png' : item.friendPictureUrl);

        let prefix = '';
        let suffix = '';
        if (item.body !== null) {
            let n = item.body.search(item.caseTitle);

            if (n > 0) {
                prefix = item.body.substring(0, n);
            }

            if ((n + item.caseTitle.length) < (item.body.length)) {
                suffix = item.body.substring((n + item.caseTitle.length), item.body.length);
            }
        }

        return (
            <View style={{flex: 1, marginBottom: 15}}>
                <View style={{flexDirection: 'row'}}>
                    {/* Profile Picture */}
                    <Image style={StyImages.friendPictureNotif}
                           source={{uri: fpUrl}}/>
                    {/* Message */}
                    <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                        <Text style={StyText.messageNotif}>
                            <Text>{prefix}</Text>
                            <Text style={{fontWeight: 'bold'}}>{item.caseTitle}</Text>
                            <Text>{suffix}</Text>
                        </Text>
                    </View>
                    {/* Image */}
                    <Image style={StyImages.attachmentThumbNotif} source={{uri: item.attachmentUrlThumb}}/>
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