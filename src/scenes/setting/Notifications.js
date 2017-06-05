/**
 * Created by michael on 5/31/2017.
 */
import React, {PureComponent} from "react";
import {View, FlatList, Text, Switch} from "react-native";
import CONSTANTS from "../../Constants";

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
            data: [
                {
                    id: 0,
                    title: "Status",
                    value: true,
                },
                {
                    id: 1,
                    title: "Like",
                    value: true,
                },
                {
                    id: 2,
                    title: "Comment",
                    value: false,
                },
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} onPressItem={this._onPressItem}/>
        );
    };

    _onPressItem = (item, index, value) => {
        const newData = this.state.data;
        newData[index].value = value;
        this.setState({
            data: newData
        });
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 15}}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
}

class ListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.item.value,
        }
    }

    _onValueChange = (value) => {
        this.setState({value});
        this.props.onPressItem(this.props.item, this.props.index, value);
    };

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 8,
            }}>
                <Text style={{fontSize: 18}}>{this.props.item.title}</Text>
                <Switch style={{flex: 1}} onValueChange={this._onValueChange}
                        value={this.state.value}/>
            </View>
        );
    }
}