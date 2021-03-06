/**
 * Created by michael on 5/19/2017.
 */
import React, {Component} from "react";
import {FlatList, Text, View, TouchableHighlight, Alert} from "react-native";
import {NavigationActions} from "react-navigation";
import CONSTANTS, {MainTheme} from "../../Constants";

import SCREEN_HELPER from "../../utils/ScreenHelper";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeSetting extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: MainTheme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: MainTheme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>

        </View>,
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="cog" size={20} color={tintColor}/>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            titleTextColor: 'black',
            data: [
                {
                    id: '1',
                    title: SCREEN_HELPER.PROFILE,
                    iconName: 'user',
                },
                {
                    id: '2',
                    title: SCREEN_HELPER.NOTIFICATIONS,
                    iconName: 'bell',
                },
                {
                    id: '3',
                    title: SCREEN_HELPER.CHANGE_PASSWORD,
                    iconName: 'unlock-alt',
                },
                {
                    id: '4',
                    title: SCREEN_HELPER.LOG_OUT,
                    iconName: 'sign-out',
                }
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    _onPress = ({item}) => {
        const {navigate} = this.props.navigation;
        switch (item.title) {
            case SCREEN_HELPER.PROFILE:
                navigate(SCREEN_HELPER.PROFILE);
                break;
            case SCREEN_HELPER.NOTIFICATIONS:
                navigate(SCREEN_HELPER.NOTIFICATIONS);
                break;
            case SCREEN_HELPER.CHANGE_PASSWORD:
                break;
            case SCREEN_HELPER.LOG_OUT:
                Alert.alert(
                    'Log Out',
                    'Are you sure you want to log out?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {
                            text: 'OK', onPress: () => {
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName: SCREEN_HELPER.LOGIN})
                                ]
                            });
                            this.props.screenProps.rootNavigation.dispatch(resetAction);
                            return true;
                        }
                        },
                    ],
                    {cancelable: false}
                );
                break;
        }
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableHighlight underlayColor={MainTheme.underlayColor} onPress={() => this._onPress({item})}>
                <View
                    style={{
                        flex: 1,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20
                    }}>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesome name={item.iconName} size={30} color={MainTheme.text_setting_tintColor}/>
                        </View>

                        <View style={{width: 10}}/>

                        <Text style={{flex: 1, fontSize: 20, color: this.state.titleTextColor}}>{item.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    _renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }
}