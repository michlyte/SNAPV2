/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { SNAPWelcomeNavigator } from './src/Router';

export default class SampleApp extends Component {
  render() {
    return (
      <SNAPWelcomeNavigator />
    );
  }
}

AppRegistry.registerComponent('SampleApp', () => SampleApp);
