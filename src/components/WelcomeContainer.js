/**
 * Created by michael on 4/13/2017.
 */
import React, {Component} from "react";
import {Image, StyleSheet, TouchableHighlight, View} from "react-native";

import {MainTheme} from "../Constants";

import ASSET_HELPER from "../utils/AssetHelper";

import Icon from "react-native-vector-icons/FontAwesome";

export default class WelcomeContainer extends Component {
    constructor(props) {
        super(props);
    }

    _onBackPressed = () => {
        this.props.navigation.goBack();
    };

    render() {
        const isBackButtonShowed = this.props.isBackButtonShowed;
        let backButton = null;
        if (isBackButtonShowed) {
            backButton = <TouchableHighlight
                style={{marginTop: 10, marginLeft: 20, position: 'absolute'}}
                onPress={this._onBackPressed}>
                <Icon name="angle-left" size={50} color={MainTheme.button_welcome_backgroundColor}/>
            </TouchableHighlight>;
        }

        return (
            <View style={{flex: 1}}>
                <Image
                    source={ASSET_HELPER.SNAP_BACKGROUND}
                    style={styles.backgroundImage}>

                    {/* BackButton */}
                    {backButton}

                    {/* Top Container */}
                    <View style={styles.containerTop}>
                        <View style={styles.logoSpace}/>
                        <Image
                            source={ASSET_HELPER.SNAP_LOGO}
                            style={styles.logo}>
                        </Image>
                        <View style={styles.logoSpace}/>
                    </View>

                    {/* Bottom Container */}
                    { this.props.bottomContainer }

                </Image>
            </View>
        );
    }
}

WelcomeContainer.propTypes = {
    navigation: React.PropTypes.object,
    isBackButtonShowed: React.PropTypes.bool,
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    logoSpace: {
        flex: 1,
    },
    logo: {
        flex: 5,
        resizeMode: 'contain'
    },
    containerTop: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
