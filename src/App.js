/**
 * Created by michael on 4/25/2017.
 */

import React, {Component} from "react";
import {AsyncStorage, Platform} from "react-native";
import CONSTANTS, {RestAPI} from "./Constants";
import PARAM_HELPER from "./utils/ParamHelper";
import {SNAPRoutes, SNAPWelcomeNavigator} from "./Router";
import FCM, {
    FCMEvent,
    NotificationType,
    RemoteNotificationResult,
    WillPresentNotificationResult
} from "react-native-fcm";

export default class SampleApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
        }
    }

    componentDidMount() {
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            this.setState({token: token});
        });

        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });

        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {
                return;
            }

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
            this.showLocalNotification(notif);
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
            this.setState({token: token});
        });

        // Michael Halim request to SNAP server.
        this._makeRequestGetCategories()
            .then((responseJson) => {
                if (responseJson.meta.status === RestAPI.CODE_200) {
                    AsyncStorage.setItem(PARAM_HELPER.categories, JSON.stringify(responseJson.data.entities), () => {
                        AsyncStorage.getItem(PARAM_HELPER.categories, (err, result) => {
                            let categoriesJson = JSON.parse(result);
                            console.log('===== CATEGORY =====');
                            categoriesJson.map((item) => {
                                console.log(item);
                            });
                        })
                    });
                }
            })
            .catch((error) => {
                console.error(error)
            });

        this._makeRequestGetStatus()
            .then((responseJson) => {
                if (responseJson.meta.status === RestAPI.CODE_200) {
                    AsyncStorage.setItem(PARAM_HELPER.status, JSON.stringify(responseJson.data.entities), () => {
                        AsyncStorage.getItem(PARAM_HELPER.status, (err, result) => {
                            let statusJson = JSON.parse(result);
                            console.log('===== STATUS =====');
                            statusJson.map((item) => {
                                console.log(item);
                            });
                        })
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            priority: "high",
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true
        });
    }

    componentWillUnmount() {
        this.notificationListner.remove();
        this.refreshTokenListener.remove();
    }

    render() {
        return (
            <SNAPRoutes />
        );
    }

    _makeRequestGetCategories = async () => {
        try {
            let response = await fetch(CONSTANTS.baseUrl + RestAPI.categories.url);
            console.log(response);
            return response.json();
        } catch (error) {
            console.error(error);
        }
    };

    _makeRequestGetStatus = async () => {
        try {
            let response = await fetch(CONSTANTS.baseUrl + RestAPI.status.url);
            console.log(response);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    };

    encryptedSignature = () => {
        const method = 'GET';
        const uriPath = 'egp/eparticrestapi/case/maps/download/1473928055000';
        const timestamp = '1498204811635';
        const selectedHeader = '';
        const queryString = '';
        const postBody = '';
        const reconstructedMessage =
            method + '\n'
            + selectedHeader + '\n'
            + uriPath + '\n'
            + timestamp + '\n'
            + queryString + '\n'
            + postBody + '\n';

        console.log('ecryptedSignature, Message:(' + reconstructedMessage + ')');
        // Sring signContent =
    };
}

// 06-23 15:00:11.636 26518-26897/sg.ecquaria.e_participation D/encryptedSignature: Message: (GET
//
// egp/eparticrestapi/case/maps/download/1473928055000
// 1498204811635
//
//
// )
// 06-23 15:00:11.638 26518-26897/sg.ecquaria.e_participation D/signatureContent: SHA256 : (10963080fe12d4a970f8808c053e0b6ad1c6bf48ca8a826370faa52a13a11e28)
// 06-23 15:00:11.666 26518-26897/sg.ecquaria.e_participation D/encryptedSignature: Authkey: b4pfo7w4t4hrrwdi3q2cj0bs39qzt5p8kmfl95yygpu7tee8hqxuqga5hsbm7434
// 06-23 15:00:11.667 26518-26897/sg.ecquaria.e_participation D/encryptedSignature: dateFormatted: 2017/06/23
// 06-23 15:00:11.668 26518-26897/sg.ecquaria.e_participation D/encryptedSignature: 8399b423db27204408d36005e4494385af1c58e8b3bbea3ee409e8052632c706
// 06-23 15:00:11.680 26518-26897/sg.ecquaria.e_participation D/OkHttp: --> GET http://192.168.0.19:8080/egp/eparticrestapi/case/maps/download/1473928055000 http/1.1
//     06-23 15:00:11.681 26518-26897/sg.ecquaria.e_participation D/OkHttp: User-Agent: SNAP retrofit
// 06-23 15:00:11.681 26518-26897/sg.ecquaria.e_participation D/OkHttp: Signature: 135:8399b423db27204408d36005e4494385af1c58e8b3bbea3ee409e8052632c706