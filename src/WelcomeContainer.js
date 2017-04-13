/**
 * Created by michael on 4/13/2017.
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

import Images from './Images';

export default class WelcomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={Images.SNAP_BACKGROUND}
                    style={styles.backgroundImage}>

                    {/* Top Container */}
                    <View style={styles.containerTop}>
                        <View style={styles.logoSpace}/>
                        <Image
                            source={Images.SNAP_LOGO}
                            style={styles.logo}>
                        </Image>
                        <View style={styles.logoSpace}/>
                    </View>

                    {/* Bottom Container */}
                    { this.props.bottomContainer }

                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    logoSpace: {
        flex: 1,
    },
    logo: {
        flex: 5,
        resizeMode: 'contain'
    },
    containerTop: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
