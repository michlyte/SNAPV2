/**
 * Created by michael on 6/16/2017.
 */
import React, {Component} from "react";
import {Button, InteractionManager, Text, View} from "react-native";

export default class HeaderCustom extends Component {
    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({navigation, screenProps}) => ({
        title: "My Profile!",
        headerRight: <Button
            title={"Save"}
            onPress={() => {
                navigation.state.params.onSave()
            }}
        />,
    });

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                onSave: this.onSave,
            });
        });
    }

    onSave = () => {
        console.log("onSave");
    };

    render() {
        return (
            <View>
                <Text>Chat with Michael Halim</Text>
            </View>
        );
    }
}