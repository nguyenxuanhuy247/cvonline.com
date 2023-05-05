import actionNames from './actionNames';
import * as userService from '~/services';

// User Sign Up
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNUP_START, payload: '' });
        try {
            let res = await userService.postSignUp(userData);
            if (res?.errorCode === 0) {
                dispatch(userSignUpSuccess(res));
            } else {
                dispatch(userSignUpFail(res));
            }
        } catch (error) {
            dispatch(userSignUpFail());
            console.log('An error in userSignUpStart() : ', error);
        }
    };
};

export const userSignUpSuccess = (data = {}) => ({
    type: actionNames.USER_SIGNUP_SUCCESS,
    payload: data,
});

export const userSignUpFail = (data = {}) => ({
    type: actionNames.USER_SIGNUP_FAIL,
    payload: data,
});

export const removeSignUpMessage = () => ({
    type: actionNames.REMOVE_SIGNUP_MESSAGE,
    payload: {},
});

// User Sign In
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNIN_START });
        try {
            let res = await userService.postSignIn(userData.email, userData.password);
            console.log(res);
            if (res?.errorCode === 0) {
                dispatch(userSignInSuccess(res));
            } else {
                dispatch(userSignInFail(res));
            }
        } catch (error) {
            dispatch(userSignInFail());
            console.log('An error in userSignInStart() : ', error);
        }
    };
};

export const userSignInSuccess = (data = {}) => ({
    type: actionNames.USER_SIGNIN_SUCCESS,
    payload: data,
});

export const userSignInFail = (data = {}) => ({
    type: actionNames.USER_SIGNIN_FAIL,
    payload: data,
});

export const removeSignInMessage = () => ({
    type: actionNames.REMOVE_SIGNIN_MESSAGE,
    payload: {},
});

// User Sign Out
export const userSignOut = () => ({
    type: actionNames.USER_SIGNOUT,
});
