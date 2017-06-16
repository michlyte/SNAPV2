/**
 * Created by michael on 6/16/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {DataType} from "../utils/EnumHelper";
import {MainTheme} from "../Constants";

export class ToggleAllAndMyCases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
        };
    }

    onTabPress = (index) => {
        this.props.onTabPress(index);

        this.setState({
            selectedIndex: index,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    tabStyle={styles.tabStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    tabTextStyle={styles.tabTextStyle}
                    values={[DataType.AllCases, DataType.MyCases]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.onTabPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    tabStyle: {
        borderColor: MainTheme.navBar_tintColor,
        backgroundColor: MainTheme.navBar_backgroundColor,
    },
    activeTabStyle: {
        backgroundColor: MainTheme.navBar_tintColor,
    },
    activeTabTextStyle: {
        color: MainTheme.navBar_backgroundColor,
    },
    tabTextStyle: {
        color: MainTheme.navBar_tintColor,
    },
});