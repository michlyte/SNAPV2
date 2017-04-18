import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import ChatScreen from './ChatScreen';
import AllContactsScreen from './AllContactsScreen';

// Welcome
import WelcomeScreen from './WelcomeScreen';
import WelcomeRegisterViaEmailScreen from './WelcomeRegisterViaEmailScreen';
import WelcomeVerificationCodeScreen from './WelcomeVerificationCodeScreen';
import WelcomeAcknowledgementScreen from './WelcomeAcknowledgementScreen';
import WelcomeForgotScreen from './WelcomeForgotScreen';

// Home Tab
import HomeList from './List';
import HomeGrid from './Grid';

// Example
import WebViewExample from './example/WebViewExample';
import CarouselExample from './example/carousel/CarouselExample';

export const MainScreenNavigator = TabNavigator({
  List: { screen: HomeList },
  Grid: { screen: HomeGrid },
});

export const SNAPExampleNavigator = StackNavigator({
    Carousel: { screen: CarouselExample },
    WebView: { screen: WebViewExample },
});

// SNAP : If you change any screen name please do the same in the Screen.js file.
export const SNAPWelcomeNavigator = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  RegisterEmail: { screen: WelcomeRegisterViaEmailScreen },
  VerificationCode: { screen: WelcomeVerificationCodeScreen },
  Acknowledgement: { screen: WelcomeAcknowledgementScreen },
  Forgot: { screen: WelcomeForgotScreen },
  Chat: {screen: AllContactsScreen },
});
