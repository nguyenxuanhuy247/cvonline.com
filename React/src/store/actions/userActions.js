import actionNames from './actionNames';
import * as userService from '~/services';

// User signin
export const userSignInStart = (dataUser) => async (dispatch) => {
    dispatch(actionNames.USER_SIGNIN_START);
    try {
        let res = await userService.handleSignIn(dataUser.email, dataUser.password);
        if (res?.errorCode === 0) {
        }
    } catch (error) {
        userSignInFail();
        console.log('An error in hashUserPassword() : ', error);
    }
};

export const userSignInSuccess = () => ({
    type: actionNames.USER_LOGIN_FAIL,
});

export const userSignInFail = () => ({
    type: actionNames.USER_LOGIN_FAIL,
});

// User signup
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch(actionNames.USER_SIGNUP_START);
        try {
            let res = await userService.handleSignUp(userData);
            if (res?.errorCode === 0) {
                dispatch(userSignUpSuccess());
            } else {
                dispatch(userSignUpFail());
            }
        } catch (error) {
            userSignUpFail();
            console.log('An error in userSignUpStart() : ', error);
        }
    };
};

export const userSignUpSuccess = () => ({
    type: actionNames.USER_LOGIN_FAIL,
});

export const userSignUpFail = () => ({
    type: actionNames.USER_LOGIN_FAIL,
});
