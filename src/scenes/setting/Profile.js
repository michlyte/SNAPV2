/**
 * Created by michael on 5/19/2017.
 */
import React, {Component} from "react";
import {ScrollView, View, Animated} from "react-native";
import CONSTANTS from "../../Constants";

export default class Profile extends Component {
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
    });

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        }
    }

    render() {
        return (
            <ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {y: this.state.scrollY}
                        }
                    }]
                )}>
                <View style={{flex: 1, height: 150, backgroundColor: 'black'}}/>
            </ScrollView>
        );
    }
}