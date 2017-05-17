/**
 * Created by michael on 5/17/2017.
 */
import React, {Component} from "react";
import {BackAndroid, Text, View} from "react-native";

import STYLE from "../../style/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import {NavigationActions} from "react-navigation";

export default class ForgotAcknowledgment extends Component {
    constructor(props) {
        super(props);
        this.onNavigateToRootView = this._onNavigateToRootView.bind(this);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onNavigateToRootView);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateToRootView);
    }

    _onNavigateToRootView() {
        console.log('_onNavigateToRootView');
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: SCREEN_HELPER.WELCOME})
            ]
        });
        this.props.navigation.dispatch(resetAction);
        return true;
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <WelcomeContainer
                bottomContainer={
                    <ForgotAcknowledgementBottomContainer
                        onDonePressed={this.onNavigateToRootView}/> }
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
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <Text style={STYLE.text}>
                        { STRING_HELPER.forgotAcknowledgment }
                    </Text>

                    <View style={STYLE.space}/>

                    <WelcomeButton
                        onPress={this.props.onDonePressed}
                        text={STRING_HELPER.DONE}/>
                </View>
            </View>
        );
    }
}