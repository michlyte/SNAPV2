/**
 * Created by michael on 6/20/2017.
 */
export function User(userId, email, displayName, authKey, maxAttachment, deviceUserId, login: true) {
    this.userId = userId || '';
    this.email = email || '';
    this.displayName = displayName || '';
    this.authKey = authKey || '';
    this.maxAttachment = maxAttachment || '';
    this.deviceUserId = deviceUserId || '';
    this.login = login;
}

export function UserJson(userJson) {
    this.userId = userJson.userId;
    this.email = userJson.email;
    this.displayName = userJson.displayName;
    this.authKey = userJson.authKey;
    this.maxAttachment = userJson.maxAttachment;
    this.deviceUserId = userJson.deviceUserId;
    this.login = userJson.login;
}