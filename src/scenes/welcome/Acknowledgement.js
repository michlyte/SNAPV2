/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {BackAndroid, Text, View} from "react-native";

import STYLE from "../../style/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import {NavigationActions} from "react-navigation";

export default class WelcomeAcknowledgementScreen extends Component {
    constructor(props) {
        super(props);
        this._onNavigateToRootView = this._onNavigateToRootView.bind(this);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    _onNavigateToRootView() {
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
        const {params} = this.props.navigation.state;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeAcknowledgementBottomContainer
                        navigation={navigation}
                        email={params.email}/> }
                navigation={navigation}
                isBackButtonShowed={ false }
            />
        );
    }
}

class WelcomeAcknowledgementBottomContainer extends Component {
    constructor(props) {
        super(props);

        this.onNextPressed = this._onNextPressed.bind(this);
    }

    _onNextPressed() {
        console.log(this.props.email);
    }

    render() {
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <Text style={STYLE.text}>
                        { STRING_HELPER.verificationAcknowledgment }
                    </Text>

                    <View style={STYLE.space}/>

                    <WelcomeButton
                        onPress={this.onNextPressed}
                        text={STRING_HELPER.NEXT}/>
                </View>
            </View>
        );
    }
}