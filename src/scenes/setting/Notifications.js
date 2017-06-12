/**
 * Created by michael on 5/31/2017.
 */
import React, {PureComponent} from "react";
import {FlatList, StyleSheet, Switch, Text, View} from "react-native";
import CONSTANTS from "../../Constants";
import NotificationClass from "../../models/NotificationClass";
import {NotificationType} from "../../utils/EnumHelper";

export default class Notifications extends PureComponent {
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
            selected: (new Map(): Map<string, boolean>),
            data: [
                new NotificationClass(0, NotificationType.Status, true),
                new NotificationClass(1, NotificationType.Like, true),
                new NotificationClass(2, NotificationType.Comment, true),
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item, index}) => {
        return (
            <NotificationItem
                item={item}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.get(item.id)}
            />
        );
    };

    _onPressItem = (item, value) => {
        this.setState((state) => {
            let newState = state;
            // Set value
            newState.data[item.id].value = value;

            // Notify flatlist to update component
            const selected = new Map(state.selected);
            selected.set(item.id, !selected.get(item.id)); // toggle
            newState.selected = selected;

            return {newState};
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                />
            </View>
        );
    }
}

class NotificationItem extends PureComponent {
    _onValueChange = (value) => {
        this.props.onPressItem(this.props.item, value);
    };

    render() {
        return (
            <View style={styles.notificationItem}>
                <Text
                    style={styles.notificationTitle}
                >
                    {this.props.item.title}
                </Text>
                <Switch
                    style={styles.notificationSwitch}
                    onValueChange={this._onValueChange}
                    value={this.props.item.value}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CONSTANTS.theme.normal_backgroundColor,
        paddingTop: 15
    },
    notificationItem: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 8,
    },
    notificationTitle: {
        fontSize: 18
    },
    notificationSwitch: {
        flex: 1
    },
});