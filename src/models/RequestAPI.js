/**
 * Created by michael on 6/19/2017.
 */
export function LoginRequestClass(email, password, imei, pushRegId, deviceType) {
    this.email = email || '';
    this.password = password || '';
    this.imei = imei || '';
    this.pushRegId = pushRegId || '';
    this.deviceType = deviceType || '';
}

export function PreRegisterRequestClass(email, password) {
    this.email = email;
    this.password = password;
}

export function RegisterViaEmailRequestClass(email, password, displayName, imei, pushRegId, deviceType, verificationCode) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
    this.imei = imei;
    this.pushRegId = pushRegId;
    this.deviceType = deviceType;
    this.verificationCode = verificationCode;
}