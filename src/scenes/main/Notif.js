/**
 * Created by michael on 5/16/2017.
 */
import React, {Component} from "react";
import {ActivityIndicator, FlatList, Image, Text, TouchableHighlight, View} from "react-native";
import THEME from "../../style/Theme";
import CONSTANTS from "../../Constants";

import SCREEN_HELPER from "../../utils/ScreenHelper";
import ASSET_HELPER from "../../utils/AssetHelper";

import StyImages from "../../style/Image";
import StyText from "../../style/Text";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeNotif extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: THEME.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: THEME.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN_HELPER.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={THEME.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'Notif',
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            error: null,
            refreshing: false,
        }
    }

    componentDidMount() {
        this._wsRequest();
    }

    _wsRequest() {
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

        switch (CONSTANTS.BUILD) {
            case CONSTANTS.BUILD_TYPE.DEVELOPMENT_DUMMY:
                const {page} = this.state;
                let newData = [];
                for (i = (page * 20); i <= ((page * 20) * 20); i++) {
                    if (i == 2) {
                        newData.push({
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

                    newData.push({
                        notificationId: i,
                        body: 'egp_ecquaria commented on your case : test title.',
                        caseTitle: 'test title',
                        caseId: i,
                        friendPictureUrl: 'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                        attachmentUrlThumb: 'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                        notificationDate: '1460483504000',
                    });
                }
                this.setState({
                    data: page === 1 ? newData : [...this.state.data, ...newData],
                });
                break;
            case CONSTANTS.BUILD_TYPE.DEVELOPMENT:
            case CONSTANTS.BUILD_TYPE.PRODUCTION:
                // const {page, seed} = this.state;
                // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
                // this.setState({loading: true});
                // fetch(url)
                //     .then(res => res.json())
                //     .then(res => {
                //         this.setState({
                //             data: page === 1 ? res.results : [...this.state.data, ...res.results],
                //             error: res.error || null,
                //             loading: false,
                //             refreshing: false
                //         });
                //     })
                //     .catch(error => {
                //         this.setState({error, loading: false});
                //     });
                break;
            default:
                break;
        }
    }

    // To change default id 'key' to 'notificationId'
    _keyExtractor = (item, index) => item.notificationId;

    _onRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true
            },
            () => {
                this._wsRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this._wsRequest();
            }
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    _onPressItem = (notificationId: string) => {

    };

    _renderItem = ({item, index}) => {
        let fpUrl = (item.friendPictureUrl ? {uri: item.friendPictureUrl} : ASSET_HELPER.img_no_profile_picture);

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
                    {/* Friend profile picture */}
                    <Image style={StyImages.friendPictureNotif}
                           source={fpUrl}/>
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
                    keyExtractor={this._keyExtractor}
                    onRefresh={() => this._onRefresh}
                    refreshing={false}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={20}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        );
    }
}