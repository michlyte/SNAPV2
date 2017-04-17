/**
 * Created by michael on 4/17/2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    BackAndroid,
} from 'react-native';

import SCREEN from './util/Screen';
import STYLE from './util/Style';
import STRINGS from './util/Strings';
import WelcomeContainer from './WelcomeContainer';
import WelcomeButton from './ecq/WelcomeButton';

import { NavigationActions } from 'react-navigation';

export default class WelcomeAcknowledgementScreen extends Component {
    static navigationOptions = {
        title: SCREEN.ACKNOWLEDGEMENT,
        header: {
            visible: false
        }
    };

    constructor(props) {
        super(props);
        this._onNavigateToRootView = this._onNavigateToRootView.bind(this);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        BackAndroid.removeEventListener('hardwareBackPress', this._onNavigateToRootView);
    }

    _onNavigateToRootView() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: SCREEN.WELCOME })
            ]
        });
        this.props.navigation.dispatch(resetAction);
        return true;
    }

    render() {
        const navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        return(
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

        this.state =  {
            verificationCode: '',
        }
    }

    _onNextPressed() {
        console.log('_onNextPressed');
        console.log(this.props.email);
    }

    render() {
        return (
            <View style={STYLE.containerBottom}>
                <View style={STYLE.page}>
                    <Text style={STYLE.text}>
                        { STRINGS.verificationAcknowledgment }
                    </Text>

                    <View style={STYLE.space}/>

                    <WelcomeButton
                        onPress={this._onNextPressed.bind(this)}
                        text={STRINGS.NEXT}/>
                </View>
            </View>
        );
    }
}