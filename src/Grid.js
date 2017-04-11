import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

export default class HomeGrid extends React.Component {
  render() {
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
