import actionNames from './actionNames';
import * as userService from '~/services';
import { toast } from 'react-toastify';

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
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const createTechnology = (toastText, actionName, dataSent) => {
    return async (dispatch) => {
        const actionStart = `CREATE_${actionName}_START`;
        const actionSuccess = `CREATE_${actionName}_SUCCESS`;
        const actionFailure = `CREATE_${actionName}_FAILURE`;

        dispatch(CRUDTechnology_Start_Success_Failure(actionStart));
        try {
            let res = await userService.createTechnology(dataSent);
            if (res.errorCode === 0) {
                toast.success(`Tạo mới ${toastText} thành công`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionSuccess, res));
            } else {
                toast.error(`Tạo mới ${toastText} thất bại`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, res));
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage);
            dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, error.response.data));
            console.log('An error in createTechnology() - userActions.js: ', error);
        }
    };
};

// READ TECHNOLOGY
export const readTechnology = (toastText, actionName, id, key, side, page, pageSize) => {
    return async (dispatch) => {
        const actionStart = `READ_${actionName}_START`;
        const actionSuccess = `READ_${actionName}_SUCCESS`;
        const actionFailure = `READ_${actionName}_FAILURE`;

        dispatch(CRUDTechnology_Start_Success_Failure(actionStart));
        try {
            const res = await userService.readTechnology(id, key, side, page, pageSize);

            if (res.errorCode === 0) {
                dispatch(CRUDTechnology_Start_Success_Failure(actionSuccess, res));
            } else {
                toast.error(`Tải ${toastText} thất bại`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, res));
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage);
            dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, error.response.data));
            console.log('An error in readTechnology() - userActions.js: ', error);
        }
    };
};

// UPDATE TECHNOLOGY
export const updateTechnology = (toastText, actionName, dataSent) => {
    return async (dispatch) => {
        const actionStart = `UPDATE_${actionName}_START`;
        const actionSuccess = `UPDATE_${actionName}_SUCCESS`;
        const actionFailure = `UPDATE_${actionName}_FAILURE`;

        dispatch(CRUDTechnology_Start_Success_Failure(actionStart));
        try {
            let res = await userService.updateTechnology(dataSent);
            if (res.errorCode === 0) {
                toast.success(`Sửa ${toastText} thành công`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionSuccess, res));
            } else {
                toast.error(`Sửa ${toastText} thất bại`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, res));
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage);
            dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, error.response.data));
            console.log('An error in updateTechnology() - userActions.js: ', error);
        }
    };
};

// DELETE TECHNOLOGY
export const deleteTechnology = (toastText, actionName, id, key, side) => {
    return async (dispatch) => {
        const actionStart = `DELETE_${actionName}_START`;
        const actionSuccess = `DELETE_${actionName}_SUCCESS`;
        const actionFailure = `DELETE_${actionName}_FAILURE`;

        dispatch(CRUDTechnology_Start_Success_Failure(actionStart));
        try {
            let res = await userService.deleteTechnology(id, key, side);
            if (res.errorCode === 0) {
                toast.success(`Xóa ${toastText} thành công`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionSuccess, res));
            } else {
                toast.error(`Xóa ${toastText} thất bại`);
                dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, res));
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage);
            dispatch(CRUDTechnology_Start_Success_Failure(actionFailure, error.response.data));
            console.log('An error in deleteTechnology() - userActions.js: ', error);
        }
    };
};

export const CRUDTechnology_Start_Success_Failure = (actionName, data) => ({
    type: actionNames[actionName],
    payload: data,
});
