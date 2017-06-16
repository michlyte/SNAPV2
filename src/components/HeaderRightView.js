/**
 * Created by michael on 6/13/2017.
 */
import React, {Component} from "react";
import {TouchableOpacity, View, Image} from "react-native";
import PropTypes from "prop-types";
import ScreenHelper from "../utils/ScreenHelper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {MainTheme} from "../Constants";
import AssetHelper from "../utils/AssetHelper";

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

export class EcquariaLogo extends Component {
    render() {
        return (
            <Image
                style={{
                    width: 20,
                    height: 20,
                    marginLeft: 15,
                }}
                source={AssetHelper.ic_ecquaria_logo}
            />
        );
    }
}