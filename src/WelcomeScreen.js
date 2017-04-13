import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

import SCREEN from './util/Screen';
import WelcomeContainer from './WelcomeContainer';
import WelcomeBottomContainer from './WelcomeBottomContainer';

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    title: SCREEN.WELCOME,
    header: {
      visible: false
    }
  };
  render() {
    const navigation = this.props.navigation;
    return (
      <WelcomeContainer
          bottomContainer={
              <WelcomeBottomContainer
                  styleContainerBottom={styles.containerBottom}
                  navigation={navigation}/> }
      />
    );
  }
}

const styles = StyleSheet.create({
    containerBottom: {
        flex: 3.5,
        backgroundColor: 'transparent'
    },
});