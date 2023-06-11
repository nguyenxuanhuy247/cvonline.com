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

// CREATE LIBRARY
export const createLibrary = (dataSent) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.CREATE_LIBRARY_START });
        try {
            let res = await userService.createLibrary(dataSent);
            console.log('createLibrary:', res);
            if (res.errorCode === 0) {
                dispatch(createLibrarySuccess(res));
            } else {
                dispatch(createLibraryFailed(res));
            }
        } catch (error) {
            dispatch(
                createLibraryFailed({
                    errorCode: 41,
                    errorMessage: `Kiểm tra lại kết nối`,
                }),
            );
            console.log('An error in createLibrary() - userActions.js: ', error);
        }
    };
};

export const createLibrarySuccess = (data) => ({
    type: actionNames.CREATE_LIBRARY_SUCCESS,
    payload: data,
});

export const createLibraryFailed = (data) => ({
    type: actionNames.CREATE_LIBRARY_FAILED,
    payload: data,
});

// READ LIBRARY
export const readLibrary = (side, page, pageSize) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.READ_LIBRARY_START });
        try {
            const res = await userService.readLibrary('LI', side, 'ALL', page, pageSize);
            if (res.errorCode === 0) {
                dispatch(readLibrarySuccess(res));
            } else {
                dispatch(readLibraryFailed(res));
            }
        } catch (error) {
            dispatch(
                readLibraryFailed({
                    errorCode: 41,
                    errorMessage: `Kiểm tra lại kết nối`,
                }),
            );
            console.log('An error in readLibrary() - userActions.js: ', error);
        }
    };
};

export const readLibrarySuccess = (data) => ({
    type: actionNames.READ_LIBRARY_SUCCESS,
    payload: data,
});

export const readLibraryFailed = (data) => ({
    type: actionNames.READ_LIBRARY_FAILED,
    payload: data,
});

// UPDATE LIBRARY
export const updateLibrary = (dataSent) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.UPDATE_LIBRARY_START });
        try {
            let res = await userService.updateLibrary(dataSent);
            if (res.errorCode === 0) {
                dispatch(updateLibrarySuccess(res));
            } else {
                dispatch(updateLibraryFailed(res));
            }
        } catch (error) {
            dispatch(
                updateLibraryFailed({
                    errorCode: 41,
                    errorMessage: `Kiểm tra lại kết nối`,
                }),
            );
            console.log('An error in updateLibrary() - userActions.js: ', error);
        }
    };
};

export const updateLibrarySuccess = (data) => ({
    type: actionNames.UPDATE_LIBRARY_SUCCESS,
    payload: data,
});

export const updateLibraryFailed = (data) => ({
    type: actionNames.UPDATE_LIBRARY_FAILED,
    payload: data,
});

// DELETE LIBRARY
export const deleteLibrary = (side, id) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.DELETE_LIBRARY_START });
        try {
            let res = await userService.deleteLibrary('LI', side, id);
            if (res.errorCode === 0) {
                dispatch(deleteLibrarySuccess(res));
            } else {
                dispatch(deleteLibraryFailed(res));
            }
        } catch (error) {
            dispatch(
                deleteLibraryFailed({
                    errorCode: 41,
                    errorMessage: `Kiểm tra lại kết nối`,
                }),
            );
            console.log('An error in deleteLibrary() - userActions.js: ', error);
        }
    };
};

export const deleteLibrarySuccess = (data) => ({
    type: actionNames.DELETE_LIBRARY_SUCCESS,
    payload: data,
});

export const deleteLibraryFailed = (data) => ({
    type: actionNames.DELETE_LIBRARY_FAILED,
    payload: data,
});
