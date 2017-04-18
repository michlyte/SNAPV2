/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { SNAPWelcomeNavigator, SNAPExampleNavigator } from './src/Router';

export default class SampleApp extends Component {
  render() {
    return (
      <SNAPExampleNavigator />
    );
  }
}

AppRegistry.registerComponent('SampleApp', () => SampleApp);
