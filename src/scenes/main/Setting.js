/**
 * Created by michael on 5/19/2017.
 */
import React, {Component} from "react";
import {FlatList, Text, View, TouchableHighlight} from "react-native";
import CONSTANTS from "../../Constants";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeSetting extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: CONSTANTS.theme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
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
                    title: 'Profile',
                    iconName: 'user',
                },
                {
                    id: '2',
                    title: 'Notifications',
                    iconName: 'bell',
                },
                {
                    id: '3',
                    title: 'Change Password',
                    iconName: 'unlock-alt',
                },
                {
                    id: '4',
                    title: 'Log Out',
                    iconName: 'sign-out',
                }
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    _onPress = () => {
        console.log('onPress')
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableHighlight underlayColor={'lightgray'} onPress={this._onPress}>
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
                            <FontAwesome name={item.iconName} size={30} color={CONSTANTS.theme.text_setting_tintColor}/>
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
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
}