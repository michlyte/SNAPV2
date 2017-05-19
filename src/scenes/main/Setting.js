/**
 * Created by michael on 5/19/2017.
 */
import React, {Component} from "react";
import {FlatList, Text, View, Image} from "react-native";
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
            data: [
                {
                    id: '1',
                    title: 'Profile',
                    iconName: 'user',
                },
                {
                    id: '2',
                    title: 'Log Out',
                    iconName: 'sign-out',
                }
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item, index}) => {
        return (
            <View
                style={{flex: 1, height: 40, justifyContent: 'center', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 30, height: 30}}>
                        <FontAwesome name={item.iconName} size={30} color={CONSTANTS.theme.text_setting_tintColor}/>
                    </View>

                    <View style={{width: 10}}/>

                    <Text style={{fontSize: 20}}>{item.title}</Text>
                </View>
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "88%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "12%"
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
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}