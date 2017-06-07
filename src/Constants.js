/**
 * Created by michael on 4/17/2017.
 */
import THEME from "./styles/Theme";

export default class Constants {
    static appName = 'SNAP';
    static TWITTER_CONSUMER_KEY = 'SAjWrixnPGkqFRNrNlBV8fbPP';
    static TWITTER_CONSUMER_SECRET = 'BJIqhvidDU8Ce1O7lHoubQtMd6Br2VsaOsu2Mmhi5W3DEXZEgU';

    static isLoggedIn = false;

    static BUILD_TYPE = {
        DEVELOPMENT_DUMMY: 'devDummy',
        DEVELOPMENT: 'dev',
        PRODUCTION: 'prod',
    };
    static BUILD = 'devDummy';
    static theme = THEME;
}