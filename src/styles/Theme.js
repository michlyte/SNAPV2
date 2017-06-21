/**
 * Created by michael on 4/27/2017.
 */
import COLOR from './Color';

export const Ecquaria = {
    welcomeTheme: new WelcomeTheme(
        'transparent',
        'white',
        COLOR.GREEN,
        COLOR.GREEN,
        COLOR.GREEN,
        'white',
        'white',
    ),
    mainTheme: new MainTheme(
        COLOR.BLUE,
        'white',
        COLOR.BLUE,
        'white',
        COLOR.BLUE,
        COLOR.GREEN,
        'white',
        'lightgray',
        'COLOR.BLUE',
    ),
};

function WelcomeTheme(tabBar_welcome_backgroundColor,
                      tabBar_welcome_tintColor,
                      tabBar_welcome_indicatorColor,
                      button_welcome_backgroundColor,
                      button_text_welcome_tintColor,
                      button_welcome_tintColor,
                      text_welcome_tintColor,) {
    this.tabBar_welcome_backgroundColor = tabBar_welcome_backgroundColor;
    this.tabBar_welcome_tintColor = tabBar_welcome_tintColor;
    this.tabBar_welcome_indicatorColor = tabBar_welcome_indicatorColor;
    this.button_welcome_backgroundColor = button_welcome_backgroundColor;
    this.button_text_welcome_tintColor = button_text_welcome_tintColor;
    this.button_welcome_tintColor = button_welcome_tintColor;
    this.text_welcome_tintColor = text_welcome_tintColor;
};

function MainTheme(navBar_backgroundColor,
                   navBar_tintColor,
                   tabBar_backgroundColor,
                   tabBar_tintColor,
                   text_setting_tintColor,
                   button_tintColor,
                   normal_backgroundColor,
                   underlayColor,
                   line,) {
    this.navBar_backgroundColor = navBar_backgroundColor;
    this.navBar_tintColor = navBar_tintColor;
    this.tabBar_backgroundColor = tabBar_backgroundColor;
    this.tabBar_tintColor = tabBar_tintColor;
    this.text_setting_tintColor = text_setting_tintColor;
    this.button_tintColor = button_tintColor;
    this.normal_backgroundColor = normal_backgroundColor;
    this.underlayColor = underlayColor;
    this.line = line;
};

// export const EcquariaTheme = {
//     // Welcome
//     tabBar_welcome_backgroundColor: 'transparent',
//     tabBar_welcome_tintColor: 'white',
//     tabBar_welcome_indicatorColor: COLOR.GREEN,
//
//     button_welcome_backgroundColor: COLOR.GREEN,
//     button_text_welcome_tintColor = COLOR.GREEN;
//     button_welcome_tintColor = 'white';
//
//     text_welcome_tintColor = 'white';
//
//     // Main
//     navBar_backgroundColor = COLOR.BLUE;
//     navBar_tintColor = 'white';
//
//     tabBar_backgroundColor = COLOR.BLUE;
//     tabBar_tintColor = 'white';
//
//     text_setting_tintColor = COLOR.BLUE;
//     button_tintColor = COLOR.GREEN;
//
//     normal_backgroundColor = 'white';
//
//     // TouchableHighlight
//     underlayColor = 'lightgray';
//
//     line = COLOR.BLUE;
// }