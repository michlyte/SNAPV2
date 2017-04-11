import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

import Images from './Images';
import WelcomeBottomContainer from './WelcomeBottomContainer';

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: {
      visible: false
    }
  };
  render() {
    const navigation = this.props.navigation;
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
          <WelcomeBottomContainer
            styleContainerBottom={styles.containerBottom}
            navigation={navigation}/>

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
  containerBottom: {
    flex: 3.5,
    backgroundColor: 'transparent'
  },
});
