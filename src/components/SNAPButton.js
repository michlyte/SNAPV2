/**
 * Created by michael on 6/8/2017.
 */
import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {MainTheme} from "../Constants";
import STYLE from "../styles/Style";

import Icon from "react-native-vector-icons/FontAwesome";

export default class SNAPButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={ this.props.onPress }
            >
                <View style={{flexDirection: 'row'}}>
                    <Text style={{
                        color: MainTheme.button_tintColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>
                        {this.props.text}
                    </Text>
                    <View style={STYLE.divider}/>
                    <Icon name="check" size={20} color={MainTheme.button_text_welcome_tintColor}/>
                </View>
            </TouchableOpacity>
        );
    }
}