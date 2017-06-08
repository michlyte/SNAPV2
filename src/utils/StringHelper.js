import CONSTANTS from "../Constants";

export default class StringHelper {
    static placeHolderEmailAddress = 'Email address';
    static placeHolderPassword = 'Password';
    static placeHolderConfirmPassword = 'Confirm Password';
    static placeHolderVerificationCode = 'Verification Code';
    static placeHolderAllCases = 'All Cases';
    static placeHolderMyCases = 'My Cases';

    static LOGIN = 'LOGIN';
    static SIGN_UP = 'SIGN UP';
    static FACEBOOK = 'FACEBOOK';
    static TWITTER = 'TWITTER';
    static REGISTER = 'REGISTER';
    static RESEND = 'RESEND';
    static VERIFY = 'VERIFY';
    static FORGOT = 'FORGOT';
    static NEXT = 'NEXT';
    static DONE = 'DONE';

    static forgotYourLoginDetails = 'Forgot your login details?';
    static getHelpSigningIn = 'Get help signing in.';
    static verificationCodeHasBeenSent = 'The verification code has been sent to your registered Email Address: @email';
    static pleaseTypeVerficationCode = 'Please type in the code to proceed.';
    static verificationAcknowledgment = 'Congratulations! You have successfully registered to ' + CONSTANTS.appName + '. You can submit a new case.';
    static forgotAcknowledgment = 'We have sent you the instruction on how to reset your password.\n\nIf you do not receive the email, please check whether it is in your junk mail.';

    static REGISTER_VIA_FACEBOOK = 'Register via Facebook';
    static REGISTER_VIA_TWITTER = 'Register via Twitter';

    static errorMsgEmailAddress = 'Insert a valid email';
}
