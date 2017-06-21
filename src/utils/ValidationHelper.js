/**
 * Created by michael on 6/21/2017.
 */
export function isValidEmail(email: string) {
    return email.includes("@");
}

export function isValidPassword(password: string) {
    return password.length > 4 ? true : false;
}