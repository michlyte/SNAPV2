/**
 * Created by michael on 4/17/2017.
 */
import React, {Component} from "react";
import {BackHandler, Text, View} from "react-native";
import PropTypes from "prop-types";

import {welcomeStyle} from "../../styles/Style";

import STRING_HELPER from "../../utils/StringHelper";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import WelcomeContainer from "../../components/WelcomeContainer";
import WelcomeButton from "../../components/WelcomeButton";

import {NavigationActions} from "react-navigation";

export default class WelcomeAcknowledgementScreen extends Component {
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
        const {params} = this.props.navigation.state;
        return (
            <WelcomeContainer
                bottomContainer={
                    <WelcomeAcknowledgementBottomContainer
                        navigation={navigation}
                        email={params.email}
                        onNavigateToRootView={this._onNavigateToRootView}/> }
                navigation={navigation}
                isBackButtonShowed={ false }
            />
        );
    }
}

class WelcomeAcknowledgementBottomContainer extends Component {
    constructor(props) {
        super(props);
    }

    _onNextPressed = () => {
        this.props.onNavigateToRootView();
    };

    render() {
        return (
            <View style={welcomeStyle.containerBottom}>
                <View style={welcomeStyle.page}>
                    <Text style={welcomeStyle.text}>
                        { STRING_HELPER.verificationAcknowledgment }
                    </Text>

                    <View style={welcomeStyle.space}/>

                    <WelcomeButton
                        onPress={this._onNextPressed}
                        text={STRING_HELPER.NEXT}/>
                </View>
            </View>
        );
    }
}

WelcomeAcknowledgementBottomContainer.propTypes = {
    email: PropTypes.string.isRequired,
    onNavigateToRootView: PropTypes.func.isRequired,
};