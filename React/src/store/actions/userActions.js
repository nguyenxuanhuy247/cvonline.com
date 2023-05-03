import actionNames from './actionNames';
import * as userService from '~/services';

// User Sign Up
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNUP_START });
        try {
            let res = await userService.postSignUp(userData);
            if (res?.errorCode === 0) {
                dispatch(userSignUpSuccess(res.data));
            } else {
                dispatch(userSignUpFail());
            }
        } catch (error) {
            dispatch(userSignUpFail());
            console.log('An error in userSignUpStart() : ', error);
        }
    };
};

export const userSignUpSuccess = (userData) => ({
    type: actionNames.USER_SIGNUP_SUCCESS,
    payload: userData,
});

export const userSignUpFail = () => ({
    type: actionNames.USER_SIGNUP_FAIL,
});

// User sign In
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNIN_START });
        try {
            let res = await userService.postSignIn(userData.email, userData.password);
            if (res?.errorCode === 0) {
                dispatch(userSignInSuccess(res.data));
            }
        } catch (error) {
            dispatch(userSignInFail())
            console.log('An error in userSignInStart() : ', error);
        }
    };
};

export const userSignInSuccess = (data) => ({
    type: actionNames.USER_SIGNIN_SUCCESS,
    payload: data,
});

export const userSignInFail = () => ({
    type: actionNames.USER_SIGNIN_FAIL,
});
