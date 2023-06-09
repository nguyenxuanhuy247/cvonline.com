import actionNames from './actionNames';
import * as userService from '~/services';

// USER SIGN UP
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNUP_START });
        try {
            let res = await userService.postSignUp(userData);
            if (res?.errorCode === 0) {
                dispatch(userSignUpSuccess(res));
            } else {
                dispatch(userSignUpFail(res));
            }
        } catch (error) {
            dispatch(userSignUpFail());
            console.log('An error in userSignUpStart() - userActions.js: ', error);
        }
    };
};

export const userSignUpSuccess = (data) => ({
    type: actionNames.USER_SIGNUP_SUCCESS,
    payload: data,
});

export const userSignUpFail = (data) => ({
    type: actionNames.USER_SIGNUP_FAIL,
    payload: data || { errorCode: 1, errorMessage: 'Không kết nối được với máy chủ. Vui lòng thử lại sau' },
});

export const removeSignUpMessage = () => ({
    type: actionNames.REMOVE_SIGNUP_MESSAGE,
    payload: {},
});

// USER SIGN IN
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNIN_START });
        try {
            let res = await userService.postSignIn(userData.email, userData.password);
            if (res?.errorCode === 0) {
                dispatch(userSignInSuccess(res));
            } else {
                dispatch(userSignInFail(res));
            }
        } catch (error) {
            dispatch(userSignInFail());
            console.log('An error in userSignInStart() - userActions.js: ', error);
        }
    };
};

export const userSignInSuccess = (data) => ({
    type: actionNames.USER_SIGNIN_SUCCESS,
    payload: data,
});

export const userSignInFail = (data) => ({
    type: actionNames.USER_SIGNIN_FAIL,
    payload: data || { errorCode: 1, errorMessage: 'Không kết nối được với máy chủ. Vui lòng thử lại sau' },
});

export const removeSignInMessage = () => ({
    type: actionNames.REMOVE_SIGNIN_MESSAGE,
    payload: {},
});

// USER SIGN OUT
export const userSignOut = () => ({
    type: actionNames.USER_SIGNOUT,
});

// =================================================================
// CRUD LIBRARY

// CREATE
export const createLibrary = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.CREATE_LIBRARY_START });
        try {
            let res = await userService.createLibrary(data);
            if (res?.errCode === 0) {
                dispatch(createLibrarySuccess());
            } else {
                dispatch(createLibraryFailed());
            }
        } catch (error) {
            dispatch(createLibraryFailed());
            console.log('An error in createLibrary() - userActions.js: ', error);
        }
    };
};

export const createLibrarySuccess = () => ({
    type: actionNames.CREATE_LIBRARY_SUCCESS,
});

export const createLibraryFailed = () => ({
    type: actionNames.CREATE_LIBRARY_FAILED,
});

// READ
export const readLibrary = (side) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.READ_LIBRARY_START });
        try {
            const res = await userService.readLibrary('LI', side, 'ALL');
            console.log('readLibrary', res);
            if (res?.errorCode === 0) {
                dispatch(readLibrarySuccess(res.data));
            } else {
                dispatch(readLibraryFailed());
            }
        } catch (error) {
            dispatch(readLibraryFailed());
            console.log('An error in readLibrary() - userActions.js: ', error);
        }
    };
};

export const readLibrarySuccess = (data) => ({
    type: actionNames.READ_LIBRARY_SUCCESS,
    payload: data,
});

export const readLibraryFailed = () => ({
    type: actionNames.READ_LIBRARY_FAILED,
});

// UPDATE
export const updateLibrary = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.UPDATE_LIBRARY_START });
        try {
            let res = await userService.updateLibrary(data);
            if (res?.errCode === 0) {
                dispatch(updateLibrarySuccess(res.data));
            } else {
                dispatch(updateLibraryFailed());
            }
        } catch (error) {
            dispatch(updateLibraryFailed());
            console.log('An error in updateLibrary() - userActions.js: ', error);
        }
    };
};

export const updateLibrarySuccess = (data) => ({
    type: actionNames.UPDATE_LIBRARY_SUCCESS,
    payload: data,
});

export const updateLibraryFailed = () => ({
    type: actionNames.UPDATE_LIBRARY_FAILED,
});

// DELETE
export const deleteLibrary = (side, id) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.DELETE_LIBRARY_START });
        try {
            let res = await userService.deleteLibrary('LI', side, id);
            if (res?.errCode === 0) {
                dispatch(deleteLibrarySuccess());
            } else {
                dispatch(deleteLibraryFailed());
            }
        } catch (error) {
            dispatch(deleteLibraryFailed());
            console.log('An error in deleteLibrary() - userActions.js: ', error);
        }
    };
};

export const deleteLibrarySuccess = () => ({
    type: actionNames.DELETE_LIBRARY_SUCCESS,
});

export const deleteLibraryFailed = () => ({
    type: actionNames.DELETE_LIBRARY_FAILED,
});
