/**
 * Created by michael on 4/17/2017.
 */
import {Ecquaria} from "./styles/Theme";
import {Env} from "./utils/EnumHelper";
import DeviceInfo from 'react-native-device-info'
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import dateformat from "dateformat";

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

    static baseUrl = 'http://192.168.0.19:8080/';

    static isLoggedIn = false;
    static numberOfListItemPerPage = 10;
    static numberOfGridItemPerPage = 20;
    static Env = Env.DEV_DUMMY;
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
    };

    static categories = {
        url: 'egp/eparticrestapi/lookup/case_category',
    };

    static status = {
        url: 'egp/eparticrestapi/lookup/case_status',
    };

    static encryptedSignature = (method, uriPath, timestamp, postBody, autyKey, currentDate) => {
        const authKey = 'b4pfo7w4t4hrrwdi3q2cj0bs39qzt5p8kmfl95yygpu7tee8hqxuqga5hsbm7434';

        // const method = 'POST';
        // const uriPath = 'egp/eparticrestapi/case/page-filter-v2/';
        // const timestamp = '1498545163290';
        // const postBody = '{"categories":{"categoryId":[0,1,2,3,4,5,6,7,8,9]},"lastId":0,"limit":10,"query":"","statuses":{"statusId":[11,16]},"userId":""}';
        const selectedHeader = '';
        const queryString = '';
        const reconstructedMessage =
            method + '\n'
            + selectedHeader + '\n'
            + uriPath + '\n'
            + timestamp + '\n'
            + queryString + '\n'
            + postBody + '\n';

        const signContent = sha256(reconstructedMessage).toString();
        const now = new Date();
        const nowDateFormat = dateformat(now, "yyyy/mm/dd");
        const signKey = hmacSHA256(nowDateFormat, authKey).toString();
        const encryptedSignature = hmacSHA256(signContent, signKey).toString();

        switch (Constants.Env) {
            case Env.DEV_DUMMY:
            case Env.DEV:
                console.log('Message: (' + reconstructedMessage + ')');
                console.log('authKey: ' + authKey);
                console.log("dateFormatted: " + nowDateFormat);
                console.log('signKey: ' + signKey);
                console.log('signContent: ' + signContent);
                console.log('encryptedSignature: ' + encryptedSignature);
                break;
            case Env.PROD:
                break;
        }
    };
}

// 06-27 13:32:43.294 15021-15178/sg.ecquaria.e_participation D/encryptedSignature: Message: (POST
//
// egp/eparticrestapi/case/page-filter-v2/
// 1498545163290
//
// {"categories":{"categoryId":[0,1,2,3,4,5,6,7,8,9]},"lastId":0,"limit":10,"query":"","statuses":{"statusId":[11,16]},"userId":""}
// )
// 06-27 13:32:43.305 15021-15178/sg.ecquaria.e_participation D/signatureContent: SHA256 : (8dbff86e737142879084ef9f599d006a83aad3f004e29bf99d8714caf5cd3fcf)
// 06-27 13:32:43.306 15021-15178/sg.ecquaria.e_participation D/encryptedSignature: Authkey: b4pfo7w4t4hrrwdi3q2cj0bs39qzt5p8kmfl95yygpu7tee8hqxuqga5hsbm7434
// 06-27 13:32:43.317 15021-15178/sg.ecquaria.e_participation D/encryptedSignature: dateFormatted: 2017/06/27
// 06-27 13:32:43.329 15021-15178/sg.ecquaria.e_participation D/encryptedSignature: signKey: c0f5895a1719f66b69a98f036836c29b38f1e4eb4b2237c135cc1cb666b9ee57
// 06-27 13:32:43.379 15021-15178/sg.ecquaria.e_participation D/encryptedSignature: c9e43130c864e19be3bbaa84e678b4ecacd0632b6e619beabe0b1ea7717a9df7
