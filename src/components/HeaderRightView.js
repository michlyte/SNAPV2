/**
 * Created by michael on 6/13/2017.
 */
import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import ScreenHelper from "../utils/ScreenHelper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {MainTheme} from "../Constants";

export class NewCaseButton extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View
                style={{marginRight: 15}}
            >
                <TouchableOpacity
                    onPress={() => navigate(ScreenHelper.CAMERA_AND_CAMERA_ROLL)}
                >
                    <FontAwesome
                        name="plus"
                        size={20}
                        color={MainTheme.navBar_tintColor}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

NewCaseButton.propTypes = {
    navigation: PropTypes.object.isRequired,
};