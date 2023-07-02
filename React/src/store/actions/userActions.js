import actionNames from './actionNames';
import * as userService from '~/services';
import { toast } from 'react-toastify';
import { Toast } from '~/components/Toast/Toast.js';

// USER SIGN UP - CREATE USER INFORMATION
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNUP_START });
        try {
            let res = await userService.postSignUp(userData);
            const { errorCode, errorMessage } = res;
            if (errorCode === 0) {
                toast.success(`${errorMessage}`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(userSignUpSuccess());
            } else {
                toast.error(`${errorMessage}`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(userSignUpFail());
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(userSignUpFail());
            console.log('An error in userSignUpStart() - userActions.js: ', error);
        }
    };
};

export const userSignUpSuccess = () => ({
    type: actionNames.USER_SIGNUP_SUCCESS,
});

export const userSignUpFail = () => ({
    type: actionNames.USER_SIGNUP_FAIL,
});

// USER SIGN IN
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: actionNames.USER_SIGNIN_START });
        try {
            let res = await userService.postSignIn(userData.email, userData.password);
            const { errorCode, errorMessage, data } = res;
            if (errorCode === 0) {
                toast.success(`${errorMessage}`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(userSignInSuccess(data));
            } else {
                toast.error(`${errorMessage}`, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(userSignInFail());
            }
        } catch (error) {
            toast.error(error.response.data.errorMessage, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(userSignInFail());
            console.log('An error in userSignInStart() - userActions.js: ', error);
        }
    };
};

export const userSignInSuccess = (user) => ({
    type: actionNames.USER_SIGNIN_SUCCESS,
    payload: user,
});

export const userSignInFail = () => ({
    type: actionNames.USER_SIGNIN_FAIL,
});

// USER SIGN OUT
export const userSignOut = () => ({
    type: actionNames.USER_SIGNOUT,
});

// =================================================================
// CRUD USER INFORMATION

// READ USER INFORMATION
export const readUserInformation = (userId) => {
    return async (dispatch) => {
        dispatch(ReadUserInformation_Start());
        try {
            const res = await userService.readUserInformation(userId);
            return res?.errorCode;
        } catch (error) {
            Toast.TOP_CENTER_ERROR(error.response?.data?.errorMessage, 3000);
            dispatch(ReadUserInformation_Failure(error.response.data));
            console.log('An error in readUserInformation() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

export const ReadUserInformation_Start = () => ({
    type: `READ_USER_INFORMATION_START`,
});

export const ReadUserInformation_Success = (data) => ({
    type: `READ_USER_INFORMATION_SUCCESS`,
    payload: data,
});

export const ReadUserInformation_Failure = () => ({
    type: `READ_USER_INFORMATION_FAILURE`,
});

// UPDATE USER INFORMATION
export const updateUserInformation = (data) => {
    return async () => {
        try {
            let res = await userService.updateUserInformation(data);
            return res?.errorCode;
        } catch (error) {
            Toast.TOP_CENTER_ERROR(error.response?.data?.errorMessage, 3000);
            console.log('An error in updateTechnology() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// =================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const createTechnology = (data) => {
    return async () => {
        try {
            let res = await userService.createTechnology(data);
            return res.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in createTechnology() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// UPDATE TECHNOLOGY
export const updateTechnology = (data) => {
    return async () => {
        try {
            let res = await userService.updateTechnology(data);
            return res?.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in updateTechnology() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// DELETE TECHNOLOGY
export const deleteTechnology = (id) => {
    return async () => {
        try {
            let res = await userService.deleteTechnology(id);
            return res?.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in deleteTechnology() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// =================================================================
// CRUD PRODUCT LIST

// CREATE PRODUCT
export const createProduct = (userId) => {
    return async () => {
        try {
            const res = await userService.createProduct(userId);
            return res?.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in readUserInformation() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// READ PRODUCT LIST
export const readProductList = (userId) => {
    return async (dispatch) => {
        dispatch(readProductList_Start());
        try {
            const res = await userService.readProductList(userId);
            const { errorCode, data } = res ?? {};
            if (errorCode === 0) {
                dispatch(readProductList_Success(data));
                return errorCode;
            } else {
                dispatch(readProductList_Failure());
                return errorCode;
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            dispatch(readProductList_Failure());
            console.log('An error in readUserInformation() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

export const readProductList_Start = () => ({
    type: `READ_PRODUCT_LIST_START`,
});

export const readProductList_Success = (data) => ({
    type: `READ_PRODUCT_LIST_SUCCESS`,
    payload: data,
});

export const readProductList_Failure = () => ({
    type: `READ_PRODUCT_LIST_FAILURE`,
});

// UPDATE PRODUCT
export const updateProduct = (data) => {
    return async () => {
        try {
            const res = await userService.updateProduct(data);
            return res?.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in readUserInformation() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};

// DELETE PRODUCT
export const deleteProduct = (userId, productId) => {
    return async () => {
        try {
            const res = await userService.deleteProduct(userId, productId);
            return res?.errorCode;
        } catch (error) {
            toast.error(error.response?.data?.errorMessage);
            console.log('An error in readUserInformation() - userActions.js: ', error);
            return error.response?.data?.errorCode;
        }
    };
};
