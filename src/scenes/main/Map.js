/**
 * Created by michael on 5/16/2017.
 */
import React, {Component} from "react";
import {StyleSheet, TouchableHighlight, View} from "react-native";
import CONSTANTS, {MainTheme} from "../../Constants";
import SCREEN from "../../utils/ScreenHelper";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";

export default class HomeMap extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: MainTheme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: MainTheme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={MainTheme.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'Map',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="map" size={20} color={tintColor}/>
        ),
    });

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});