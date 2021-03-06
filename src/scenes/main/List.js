import React, {PureComponent} from "react";
import {AsyncStorage, FlatList, InteractionManager, View} from "react-native";
import CONSTANTS from "../../Constants";
import {DataType, Env} from "../../utils/EnumHelper";
import PARAM_HELPER from "../../utils/ParamHelper";
import ListLoadMoreView from "../../components/ListLoadMoreView";
import NotifInListItem from "../../components/CaseInListItem";
import {UserJson} from "../../models/User";
import {CasePageFilter} from "../../models/RequestAPI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Header
import {mainStyle} from "../../styles/Style";
import {EcquariaLogo, NewCaseButton} from "../../components/HeaderRightView";
import {ToggleAllAndMyCases} from "../../components/HeaderCenterView";
// Dummy
import {ecqDummyListCase} from "../../dummies/Dummy";

export default class HomeList extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <ToggleAllAndMyCases
            onTabPress={(index) => navigation.state.params.onTabPress(index)}
        />,
        headerStyle: mainStyle.mainHeader,
        headerLeft: <EcquariaLogo />,
        headerRight: <NewCaseButton navigation={navigation}/>,

        tabBarLabel: 'List',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="list-ul" size={20} color={tintColor}/>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            selected: (new Map(): Map<string, boolean>),
            dataType: DataType.AllCases,
            data: [],
            page: 1,
            loading: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        // Tricky part to connect stackNavigator header with component's method.
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                onTabPress: this.onDataChange,
            });
        });

        this._onRefresh();
    }

    onDataChange = (index) => {
        this.setState((prevState) => {
                let newState = prevState;

                switch (index) {
                    case 0:
                        newState.dataType = DataType.AllCases;
                        break;
                    case 1:
                        newState.dataType = DataType.MyCases;
                        break;
                }

                return {newState};
            },
            this._onRefresh);
    };

    _makeRequestList = async (userId) => {
        const categories = {
            categoryId: [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
        };
        const statuses = {
            statusId: [10, 11, 12, 13, 14, 15, 16],
        };
        const casePageFilter = new CasePageFilter(
            '', categories, 0, 10, statuses, userId);
        // try {
        //     let response = await fetch(CONSTANTS.baseUrl + RestAPI.login.url, {
        //         method: RestAPI.login.method,
        //         headers: RestAPI.login.headers,
        //         body: JSON.stringify(loginRequest),
        //     });
        //
        //     this.props.setVisible(false);
        //     console.log(response);
        //
        //     return await response.json();
        // } catch (error) {
        //     this.props.setVisible(false);
        //     console.error(error);
        // }
        this.setState({
            data: [],
            refreshing: false,
        });
    };

    _keyExtractor = (item, index) => item.caseId;

    _onRefresh = () => {
        this.setState({
                page: 1,
                refreshing: true
            },
            () => {
                switch (CONSTANTS.Env) {
                    case Env.DEV_DUMMY:
                        let newData = ecqDummyListCase(
                            0,
                            CONSTANTS.numberOfListItemPerPage,
                            this.state.dataType);
                        this.setState({
                            data: newData,
                            refreshing: false,
                        });
                        break;
                    case Env.DEV:
                    case Env.PROD:
                        AsyncStorage.getItem(PARAM_HELPER.user, (err, result) => {
                            const userJson = new UserJson(JSON.parse(result));
                            this._makeRequestList(userJson.userId);
                        });
                        break;
                }
            });
    };

    _onEndReached = () => {
        this.setState({
                page: this.state.page + 1
            },
            () => {
                switch (CONSTANTS.Env) {
                    case Env.DEV_DUMMY:
                        this.setState({loading: true});
                        setTimeout(() => {
                            let newData = ecqDummyListCase(
                                this.state.data.length,
                                CONSTANTS.numberOfListItemPerPage,
                                this.state.dataType);
                            this.setState({
                                data: [...this.state.data, ...newData],
                                loading: false,
                            });
                        }, 1500);
                        break;
                    case Env.DEV:
                    case Env.PROD:
                        break;
                }
            });
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
                onTitlePress={this._onTitlePressed}
                onImagePress={this._onImagePressed}
                onLikePress={this._onLikePressed}
                onCommentPress={this._onCommentPressed}
                onSharePress={this._onSharePressed}
                selected={!!this.state.selected.get(item.caseId)}
            />
        );
    };

    // Events
    _onTitlePressed = (caseId: string) => {
        console.log("_onTitlePressed");
    };

    _onImagePressed = (caseId: string) => {
        console.log("_onImagePressed");
    };

    _onLikePressed = (caseId: string) => {
        this.setState((state) => {
            let newState = state;

            let newLikeState = state.data[caseId].likeState;
            if (newLikeState === '1') {
                newLikeState = '0';
            } else {
                newLikeState = '1';
            }
            newState.data[caseId].likeState = newLikeState;

            const selected = new Map(state.selected);
            selected.set(caseId, !selected.get(caseId)); // toggle
            newState.selected = selected;

            return {newState};
        });
    };

    _onCommentPressed = (caseId: string) => {
        console.log("_onCommentPressed");
    };

    _onSharePressed = (caseId: string) => {
        console.log("_onSharePressed");
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={CONSTANTS.numberOfListItemPerPage}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        );
    }
}