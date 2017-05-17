/**
 * Created by michael on 5/16/2017.
 */
import React, {Component} from "react";
import {View, TouchableHighlight} from 'react-native';
import THEME from "../../style/Theme";
import CONFIG from "../../Constants";
import SCREEN from "../../utils/ScreenHelper";

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

    render() {
        return (
            <View style={{flex: 1}}>

            </View>
        );
    }
}