/**
 * Created by michael on 6/14/2017.
 */
import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.iconSize = 30;
        this.iconColor = 'white';
    }

    onMinus = () => {
        console.log("onMinus");
    };

    onPlus = () => {
        console.log("onPlus");
    };

    onCheck = () => {
        console.log("onCheck");
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                    }}
                    source={{uri: params ? params.data : 'file:///storage/emulated/0/DCIM/IMG_20170614_095951.jpg'}}
                >
                    <View style={{
                        height: 80,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={this.onMinus}>
                            <View style={[styles.icon, {marginLeft: 20}]}>
                                <Icon
                                    name={'minus'}
                                    size={this.iconSize}
                                    color={this.iconColor}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onPlus}>
                            <View style={styles.icon}>
                                <Icon
                                    name={'plus'}
                                    size={this.iconSize}
                                    color={this.iconColor}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onCheck}>
                            <View style={[styles.icon, {marginRight: 20}]}>
                                <Icon
                                    name={'check'}
                                    size={this.iconSize}
                                    color={this.iconColor}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});