/**
 * Created by michael on 6/6/2017.
 */
import {AsyncStorage} from "react-native";
import PARAM_HELPER from "./ParamHelper";

export default class SessionHelper {

    static async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
            console.log('removeItem: key[' + key + '] removed from disk.');
        } catch (error) {
            console.log('removeItem: key[' + key + '] AsyncStorage error: ' + error.message);
        }
    }

    static mergeItem(key, object, delta) {
        AsyncStorage.setItem(key, JSON.stringify(object), () => {
            AsyncStorage.mergeItem(key, JSON.stringify(delta), () => {
                AsyncStorage.getItem(key, (err, result) => {
                    console.log("mergeItem: " + result);
                    return result;
                })
            })
        })
    }

    static multiGet(keys) {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
            });
            console.log("multiGet: " + stores);
            return stores;
        });
    }

    static multiSet(userInfo) {
        AsyncStorage.multiSet(userInfo, (err) => {
            this.getAllKeys();
        });
    }

    static getAllKeys() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                console.log("getAllKeys");
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log(key + ": " + value);
                });
                return stores;
            });
        });
    }

    static multiRemove(keys) {
        AsyncStorage.multiRemove(keys, (err) => {

        });
    }
}