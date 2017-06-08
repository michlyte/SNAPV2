/**
 * Created by michael on 4/17/2017.
 */
import THEME from "./styles/Theme";

export default class Constants {
    static appName = 'SNAP';
    static TWITTER_CONSUMER_KEY = 'SAjWrixnPGkqFRNrNlBV8fbPP';
    static TWITTER_CONSUMER_SECRET = 'BJIqhvidDU8Ce1O7lHoubQtMd6Br2VsaOsu2Mmhi5W3DEXZEgU';

    // Email
    // ecq.bdg@gmail.com
    // Ecquaria's Project
    static GOOGLE_API_KEY = 'AIzaSyAm9eKJvHIYvxVWFe4xRCyrxWx6iqLicpY';
    static GOOGLE_PLACE_API_KEY = 'AIzaSyADHgUx1kjKY4KS2F6eX0U6DKmElaCNVBY';

    static isLoggedIn = false;

    static BUILD_TYPE = {
        DEVELOPMENT_DUMMY: 'devDummy',
        DEVELOPMENT: 'dev',
        PRODUCTION: 'prod',
    };
    static BUILD = 'devDummy';
    static theme = THEME;
}