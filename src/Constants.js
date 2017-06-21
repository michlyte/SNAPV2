/**
 * Created by michael on 4/17/2017.
 */
import {Ecquaria} from "./styles/Theme";
import {Env} from "./utils/EnumHelper";
import DeviceInfo from 'react-native-device-info'

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

    /*
     * https://github.com/rebeccahughes/react-native-device-info
     */
    static uniqueID = DeviceInfo.getUniqueID();

    static baseUrl = 'http://192.168.0.19:8080/'

    static isLoggedIn = false;
    static numberOfListItemPerPage = 10;
    static numberOfGridItemPerPage = 20;
    static Env = Env.DEV;
}

export const WelcomeTheme = Ecquaria.welcomeTheme;
export const MainTheme = Ecquaria.mainTheme;

export class RestAPI {
    static CODE_200 = '200';
    static CODE_400 = '400';

    static login = {
        url: 'egp/eparticrestapi/user/login/a/a',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    static preRegister = {
        url: 'egp/eparticrestapi/user/pre/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    static registerViaEmail = {
        url: 'egp/eparticrestapi/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
}