/**
 * Created by michael on 6/16/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export class ToggleAllAndMyCases extends Component {
    onPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPress}>
                    <Text>Michael Halim</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
    },
});