import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import AllContactsScreen from './AllContactsScreen';

// Welcome
import WelcomeScreen from './WelcomeScreen';
import WelcomeRegisterViaEmailScreen from './WelcomeRegisterViaEmailScreen';

// Home Tab
import HomeList from './List';
import HomeGrid from './Grid';

export const MainScreenNavigator = TabNavigator({
  List: { screen: HomeList },
  Grid: { screen: HomeGrid },
  All: { screen: AllContactsScreen },
});

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

export const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});

export const WelcomeScreenNavigator = StackNavigator({
  Welcome: { screen: WelcomeScreen },
});

// SNAP
export const SNAPWelcomeNavigator = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  RegisterEmail: { screen: WelcomeRegisterViaEmailScreen },
  Chat: {screen: AllContactsScreen },
});
