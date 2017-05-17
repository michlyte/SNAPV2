import React, {Component} from "react";
import {Dimensions, FlatList, Image, StyleSheet, TouchableHighlight, View} from "react-native";
import THEME from "../../style/Theme";
import CONSTANTS from "../../Constants";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const gridNumOfColumns = 3;
const gridItemSize = (Dimensions.get('window').width - 20) / gridNumOfColumns;

export default class HomeGrid extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: THEME.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: THEME.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN_HELPER.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={THEME.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'Grid',
    });

    _renderItem({item, index}) {

        // Determine margin top and bottom
        let marginTop = 0;
        if (index < gridNumOfColumns) {
            marginTop = 10;
        }

        // Determine margin right and left grid
        const threshold = (index + 1) % gridNumOfColumns;
        let marginLeft = 0;
        let marginRight = 0;

        switch (threshold) {
            case 0:
                marginLeft = 0;
                marginRight = 5;
                break;
            case 1:
                marginLeft = 5;
                marginRight = 0;
                break;
            case 2:
                marginLeft = 5;
                marginRight = 5;
        }

        return (
            <View style={{
                flex: 1,
                marginTop: marginTop,
                marginBottom: 5,
                marginLeft: marginLeft,
                marginRight: marginRight,
                width: gridItemSize,
                height: gridItemSize,
                backgroundColor: '#CCC',
            }}>
                <Image style={{flex: 1}}
                       source={{uri: 'https://www.ssbwiki.com/images/thumb/6/67/Chocobo.png/250px-Chocobo.png'}}/>
            </View>
        );
    }

    render() {
        return (<FlatList
            contentContainerStyle={styles.list}
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}, {key: 'g'}, {key: 'h'}, {key: 'i'}, {key: 'j'}]}
            renderItem={this._renderItem}
        />);
    }
}

const styles = StyleSheet.create({
    list: {
        // justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});
