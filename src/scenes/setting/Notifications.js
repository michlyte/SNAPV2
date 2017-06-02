/**
 * Created by michael on 5/31/2017.
 */
import React, {Component, PropTypes} from "react";
import {Animated, Switch, ScrollView, View, Text, StyleSheet} from "react-native";
import CONSTANTS from "../../Constants";
import THEME from "../../style/Theme";

export default class Notifications extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTintColor: CONSTANTS.theme.navBar_tintColor,
        headerTitleStyle: {
            color: CONSTANTS.theme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>

        </View>,
    });

    constructor(props) {
        super(props);

        this.state = {
            statusValue: true,
            commentValue: true,
            likeValue: true,
        }
    }

    _onStatusValueChange = (value) => {
        this.setState({statusValue: value});
    };

    _onCommentValueChange = (value) => {
        this.setState({commentValue: value});
    };

    _onLikeValueChange = (value) => {
        this.setState({likeValue: value});
    };

    render() {
        return (
            <ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {y: this.state.scrollY}
                        }
                    }]
                )}>
                <View style={{height: 10}}/>

                <NotificationsContent
                    title={'Status'}
                    value={this.state.statusValue}
                    onValueChange={this._onStatusValueChange}/>

                <NotificationsContent
                    title={'Comment'}
                    value={this.state.commentValue}
                    onValueChange={this._onCommentValueChange}/>

                <NotificationsContent
                    title={'Like'}
                    value={this.state.likeValue}
                    onValueChange={this._onLikeValueChange}/>
            </ScrollView>
        );
    }
}

class NotificationsContent extends Component {
    render() {
        return (
            <View style={[{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }, styles.layout]}>
                <Text style={{flex: 2, fontSize: 18}}>{this.props.title}</Text>
                <Switch style={{flex: 1, height: 20}} onValueChange={this.props.onValueChange}
                        value={this.props.value}/>
            </View>
        );
    }
}

NotificationsContent.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    layout: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    }
});