import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";


export function authenticate(email, password, isLogin) {
    return async (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true // for firebase
        };

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAOLW6Oq5DyGRsn8EIKr6IpHlrgTwnNfRs";

        if (isLogin) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAOLW6Oq5DyGRsn8EIKr6IpHlrgTwnNfRs";
        }

        const response = await axios.post(url, authData);
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogout(time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000)
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        payload: token
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    }
}