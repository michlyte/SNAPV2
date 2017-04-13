import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import ChatScreen from './ChatScreen';
import AllContactsScreen from './AllContactsScreen';

// Welcome
import WelcomeScreen from './WelcomeScreen';
import WelcomeRegisterViaEmailScreen from './WelcomeRegisterViaEmailScreen';
import WelcomeForgotScreen from './WelcomeForgotScreen';

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

// SNAP : If you change any screen name please do the same in the Screen.js file.
export const SNAPWelcomeNavigator = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  RegisterEmail: { screen: WelcomeRegisterViaEmailScreen },
  Forgot: { screen: WelcomeForgotScreen },
  Chat: {screen: AllContactsScreen },
});
