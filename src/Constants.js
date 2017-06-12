/**
 * Created by michael on 4/17/2017.
 */
import {Ecquaria} from "./styles/Theme";
import {Env} from "./utils/EnumHelper";

export default class Constants {
    static appName = 'SNAP';
    static TWITTER_CONSUMER_KEY = 'SAjWrixnPGkqFRNrNlBV8fbPP';
    static TWITTER_CONSUMER_SECRET = 'BJIqhvidDU8Ce1O7lHoubQtMd6Br2VsaOsu2Mmhi5W3DEXZEgU';

    /*
     Email
     ecq.bdg@gmail.com
     Ecquaria's Project
     */
    static GOOGLE_API_KEY = 'AIzaSyAm9eKJvHIYvxVWFe4xRCyrxWx6iqLicpY';

    static isLoggedIn = true;
    static numberOfItemPerPage = 10;
    static Env = Env.DEV_DUMMY;
}

export const WelcomeTheme = Ecquaria.welcomeTheme;
export const MainTheme = Ecquaria.mainTheme;