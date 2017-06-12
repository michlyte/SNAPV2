/**
 * Created by michael on 6/9/2017.
 */
import React, {Component} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {MainTheme} from "../../Constants";
import STRING_HELPER from "../../utils/StringHelper";
import ASSET_HELPER from "../../utils/AssetHelper";

export default class CaseLogged extends Component {
    _onFacebookPressed = () => {
        console.log("_onFacebookPressed");
    };

    _onTwitterPressed = () => {
        console.log("_onTwitterPressed");
    };

    _onInstagramPressed = () => {
        console.log("_onInstagramPressed");
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.space}/>

                <Text style={{fontSize: 17}}>{STRING_HELPER.caseLoggedSuccess}</Text>

                <View style={styles.space}/>

                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{STRING_HELPER.caseLoggedReferenceNumberIs}</Text>
                <Text style={{fontSize: 25, color: MainTheme.navBar_backgroundColor}}>EPARTIC-20152707-0001</Text>

                <View style={styles.space}/>

                <Text style={{paddingLeft: 10, paddingRight: 10, fontSize: 17}}>{STRING_HELPER.shareTo}</Text>

                <View style={styles.space}/>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this._onFacebookPressed}>
                        <Image style={styles.shareIcon} source={ASSET_HELPER.ic_facebook}/>
                    </TouchableOpacity>
                    <View style={{width: 15}}/>
                    <TouchableOpacity onPress={this._onTwitterPressed}>
                        <Image style={styles.shareIcon} source={ASSET_HELPER.ic_twitter}/>
                    </TouchableOpacity>
                    <View style={{width: 15}}/>
                    <TouchableOpacity onPress={this._onInstagramPressed}>
                        <Image style={styles.shareIcon} source={ASSET_HELPER.img_instagram}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: MainTheme.normal_backgroundColor,
    },
    space: {
        width: 35,
        height: 35,
    },
    shareIcon: {
        width: 70,
        height: 70,
        borderRadius: 4,
    },
});