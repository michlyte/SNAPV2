/**
 * Created by michael on 5/16/2017.
 */
import React, {PureComponent} from "react";
import {FlatList, View} from "react-native";
import CONSTANTS, {MainTheme} from "../../Constants";
import NotifInListItem from "../../components/NotifInListItem";
import ListLoadMoreView from "../../components/ListLoadMoreView";
import {Env} from "../../utils/EnumHelper";
import StringHelper from "../../utils/StringHelper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Header
import {mainStyle} from "../../styles/Style";
import {Title} from "../../components/HeaderCenterView";
// Dummy
import {ecqDummyListNotif} from "../../dummies/Dummy";

export default class HomeNotif extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <Title title={StringHelper.sceneNotifications}/>,
        headerStyle: mainStyle.mainHeader,

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
        this._onRefresh();
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
                        let newData = ecqDummyListNotif(0, CONSTANTS.numberOfListItemPerPage);
                        this.setState({
                            data: newData,
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
                            let newData = ecqDummyListNotif(
                                this.state.data.length,
                                CONSTANTS.numberOfListItemPerPage);
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
            <ListLoadMoreView />
        );
    };

    _renderItem = ({item, index}) => {
        return (
            <NotifInListItem
                item={item}
                onCasePress={this._onCasePressed}
                onUserPress={this._onUserPressed}
                selected={!!this.state.selected.get(item.notificationId)}
            />
        );
    };

    _onUserPressed = () => {
        console.log("_onUserPressed");
    };

    _onCasePressed = (notificationId: string) => {
        console.log("_onCasePressed");
        this.setState((state) => {
            let newState = state;

            const selected = new Map(state.selected);
            selected.set(notificationId, !selected.get(notificationId)); // toggle
            newState.selected = selected;

            return {newState};
        });
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
                    onEndReachedThreshold={(CONSTANTS.numberOfListItemPerPage / 2)}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        );
    }
}