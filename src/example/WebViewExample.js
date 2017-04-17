/**
 * Created by michael on 4/17/2017.
 */
import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewExample extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://github.com/facebook/react-native'}}
                style={{marginTop: 20}}
            />
        );
    }
}