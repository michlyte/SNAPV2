import React, {Component} from 'react';
import {
    ListView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import COLOR from './util/Color';
import CONFIG from './util/Config';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeList extends Component {
    static navigationOptions = {
        header: {
            title: CONFIG.appName,
            right: <View style={{marginRight: 15}}>
                <TouchableHighlight onPress={() => console.log('Add Pressed.')}>
                    <Icon name="plus" size={20} color={COLOR.GREEN}/>
                </TouchableHighlight>
            </View>
        },
        tabBarLabel: 'List',
    };

    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />
            </View>
        );
    }
}
