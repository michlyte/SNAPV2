/**
 * Created by michael on 5/19/2017.
 */
import React, {Component} from "react";
import {View} from "react-native";
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
    }

    render() {
        return (
            <View style={{flex: 1}}/>
        );
    }
}