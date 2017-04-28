import React, {Component} from 'react';
import {
    ListView,
    FlatList,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import THEME from '../../util/Theme';
import CONFIG from '../../util/Config';
import SCREEN from '../../util/Screen';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeList extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONFIG.appName,
        headerTitleStyle: {
            color: THEME.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: THEME.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN.CAMERA_AND_CAMERA_ROLL)}>
                <Icon name="plus" size={20} color={THEME.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'List',
    });

// Initialize the hardcoded data
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     dataSource: ds.cloneWithRows([
        //         'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
        //     ])
        // };
    }

    _renderItem = ({item}) => {
        return (
            <Text>{item.title}</Text>
        );
    };

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <FlatList
                    data={[{key: 'a', title: 'a title'}, {key: 'b', title: 'b title'}]}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}
