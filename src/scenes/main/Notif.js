/**
 * Created by michael on 5/16/2017.
 */
import React, {PureComponent} from "react";
import {ActivityIndicator, FlatList, Image, Text, TouchableHighlight, View} from "react-native";
import CONSTANTS, {MainTheme} from "../../Constants";
import SCREEN_HELPER from "../../utils/ScreenHelper";
import ASSET_HELPER from "../../utils/AssetHelper";
import NotifInListClass from "../../models/NotifInListClass";
import {Env} from "../../utils/EnumHelper";
import StyImages from "../../styles/Image";
import StyText from "../../styles/Text";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeNotif extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: MainTheme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: MainTheme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN_HELPER.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={MainTheme.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'Notif',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="bell" size={20} color={tintColor}/>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            selected: (new Map(): Map<string, boolean>),
            data: [],
            page: 1,
            error: null,
            loading: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                this.setState({loading: true});
                let newData = [];
                for (let i = 0; i < CONSTANTS.numberOfItemPerPage; i++) {
                    newData.push(
                        new NotifInListClass(
                            i,
                            i + ' egp_ecquaria commented on your case : test title.',
                            'test title',
                            i,
                            'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                            'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                            '1460483504000'
                        )
                    );
                }
                this.setState({
                    data: newData,
                    loading: false,
                });
                break;
            case Env.DEV:
            case Env.PROD:
                this._wsRequest();
                break;
        }
    }

    _wsRequest() {
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
                switch (CONSTANTS.Env) {
                    case Env.DEV_DUMMY:
                        this.setState({
                            loading: false,
                            refreshing: false,
                        });
                        break;
                    case Env.DEV:
                    case Env.PROD:
                        this._wsRequest();
                        break;
                }
            }
        );
    };

    _handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                switch (CONSTANTS.Env) {
                    case Env.DEV_DUMMY:
                        this.setState({loading: true});
                        setTimeout(() => {
                            let newData = [];
                            for (let i = this.state.data.length; i < this.state.data.length + CONSTANTS.numberOfItemPerPage; i++) {
                                newData.push(
                                    new NotifInListClass(
                                        i,
                                        i + ' egp_ecquaria commented on your case : test title.',
                                        'test title',
                                        i,
                                        'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg',
                                        'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg',
                                        '1460483504000'
                                    )
                                );
                            }
                            this.setState({
                                data: [...this.state.data, ...newData],
                                loading: false,
                                refreshing: false,
                            });
                        }, 1500);
                        break;
                    case Env.DEV:
                    case Env.PROD:
                        this._wsRequest();
                        break;
                }
            }
        );
    };

    _renderFooter = () => {
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
        this.setState((state) => {
            let newState = state;

            const selected = new Map(state.selected);
            selected.set(notificationId, !selected.get(notificationId)); // toggle
            newState.selected = selected;

            return newState;
        });
    };

    _renderItem = ({item, index}) => {
        return (
            <NotifListItem
                item={item}
                onPress={this._onPressItem}
                selected={!!this.state.selected.get(item.notificationId)}
            />
        );
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10, paddingRight: 10, paddingLeft: 10}}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={(CONSTANTS.numberOfItemPerPage / 2)}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        );
    }
}

class NotifListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.fpUrl = (this.props.item.friendPictureUrl ? {uri: this.props.item.friendPictureUrl} : ASSET_HELPER.img_no_profile_picture);

        this.prefix = '';
        this.suffix = '';
        if (this.props.item.body !== null) {
            let n = this.props.item.body.search(this.props.item.caseTitle);

            if (n > 0) {
                this.prefix = this.props.item.body.substring(0, n);
            }

            if ((n + this.props.item.caseTitle.length) < (this.props.item.body.length)) {
                this.suffix = this.props.item.body.substring((n + this.props.item.caseTitle.length), this.props.item.body.length);
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1, marginBottom: 15}}>
                <View style={{flexDirection: 'row'}}>
                    {/* Friend profile picture */}
                    <Image
                        style={StyImages.friendPictureNotif}
                        source={this.fpUrl}
                    />
                    {/* Message */}
                    <View
                        style={{flex: 1, marginLeft: 10, marginRight: 10}}
                    >
                        <Text style={StyText.messageNotif}>
                            <Text>{this.prefix}</Text>
                            <Text style={{fontWeight: 'bold'}}>{this.props.item.caseTitle}</Text>
                            <Text>{this.suffix}</Text>
                        </Text>
                    </View>
                    {/* Image */}
                    <Image
                        style={StyImages.attachmentThumbNotif}
                        source={{uri: this.props.item.attachmentUrlThumb}}
                    />
                </View>
            </View>
        );
    }
}