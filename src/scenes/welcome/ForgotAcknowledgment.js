/**
 * Created by michael on 5/17/2017.
 */
import React, {Component} from "react";
import {BackHandler, Text, View} from "react-native";

import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import {NavigationActions} from "react-navigation";

export default class ForgotAcknowledgment extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    _onNavigateToRootView = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: SCREEN_HELPER.WELCOME})
            ]
        });
        this.props.navigation.dispatch(resetAction);
        return true;
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <ForgotAcknowledgementBottomContainer
                        onDonePressed={this._onNavigateToRootView}/> }
                navigation={navigation}
                isBackButtonShowed={ false }
            />
        );
    }
}

class ForgotAcknowledgementBottomContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <Text style={welcomeStyle.text}>
                        { STRING_HELPER.forgotAcknowledgment }
                    </Text>

                    <View style={welcomeStyle.space}/>

                    <WelcomeButton
                        onPress={this.props.onDonePressed}
                        text={STRING_HELPER.DONE}/>
                </View>
            </View>
        );
    }
}