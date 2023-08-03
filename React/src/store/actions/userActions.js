import actionNames from './actionNames';
import * as userService from '~/services';
import { Toast } from '~/components/Toast/Toast.js';

// CHANGE PASSWORD
export const userChangePasswordStart = (userData) => {
    return async (dispatch) => {
        dispatch({
            type: 'USER_CHANGE_PASSWORD_START',
        });

        try {
            let res = await userService.postChangePassword(userData);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(userChangePasswordSuccess());
                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 3000);
                dispatch(userChangePasswordFail());
                return errorCode;
            }
        } catch (error) {
            const { errorMessage, errorCode } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage || error.message, 3000);
            dispatch(userChangePasswordFail());
            console.log('An error in userChangePasswordStart() - userActions.js: ', error);
            return errorCode;
        }
    };
};

export const userChangePasswordSuccess = () => ({
    type: 'USER_CHANGE_PASSWORD_SUCCESS',
});

export const userChangePasswordFail = () => ({
    type: 'USER_CHANGE_PASSWORD_FAIL',
});

// USER SIGN UP - CREATE USER INFORMATION
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch(userSignUp_Start());
        try {
            let res = await userService.postSignUp(userData);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
                dispatch(userSignUp_Success());
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 3000);
                dispatch(userSignUp_Fail());
            }
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage || error.message, 3000);
            dispatch(userSignUp_Fail());
            console.log('An error in userSignUpStart() - userActions.js: ', error);
        }
    };
};

export const userSignUp_Start = () => ({
    type: actionNames.USER_SIGNUP_START,
});

export const userSignUp_Success = () => ({
    type: actionNames.USER_SIGNUP_SUCCESS,
});

export const userSignUp_Fail = () => ({
    type: actionNames.USER_SIGNUP_FAIL,
});

// USER SIGN IN
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch(userSignIn_Start());
        try {
            let res = await userService.postSignIn(userData);
            const { errorCode, errorMessage, data } = res;
            if (errorCode === 0) {
                dispatch(userSignIn_Success(data));
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 3000);
                dispatch(userSignIn_Fail());
            }
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 3000);
            dispatch(userSignIn_Fail());
            console.log('An error in userSignInStart() - userActions.js: ', error);
        }
    };
};

export const userSignIn_Start = () => ({
    type: actionNames.USER_SIGNIN_START,
});

export const userSignIn_Success = (user) => ({
    type: actionNames.USER_SIGNIN_SUCCESS,
    payload: user,
});

export const userSignIn_Fail = () => ({
    type: actionNames.USER_SIGNIN_FAIL,
});

// USER SIGN OUT
export const userSignOut = () => {
    return {
        type: actionNames.USER_SIGNOUT,
    };
};

// =================================================================
// CRUD USER INFORMATION

// READ USER INFORMATION
export const readUserInformation = (userId) => {
    return async (dispatch) => {
        dispatch(ReadUserInformation_Start());
        try {
            const res = await userService.readUserInformation(userId);

            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(ReadUserInformation_Success(data));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(ReadUserInformation_Failure(data));

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage, data } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            dispatch(ReadUserInformation_Failure(data));
            console.log('An error in readUserInformation() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const ReadUserInformation_Start = () => ({
    type: actionNames.READ_USER_INFORMATION_START,
});

export const ReadUserInformation_Success = (data) => ({
    type: actionNames.READ_USER_INFORMATION_SUCCESS,
    payload: data,
});

export const ReadUserInformation_Failure = (data) => ({
    type: actionNames.READ_USER_INFORMATION_FAILURE,
    payload: data,
});

// UPDATE USER INFORMATION
export const updateUserInformation = (data) => {
    return async () => {
        try {
            let res = await userService.updateUserInformation(data);
            const { errorCode } = res ?? {};

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            console.log('An error in updateTechnology() - userActions.js: ', error);

            return errorCode;
        }
    };
};

// =================================================================
// CRUD PRODUCT

// CREATE PRODUCT
export const createProduct = (userId) => {
    return async (dispatch) => {
        dispatch(createProduct_Start());
        try {
            const res = await userService.createProduct(userId);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(createProduct_Success(data));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(createProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(createProduct_Failure());
            console.log('An error in createProduct() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const createProduct_Start = () => ({
    type: actionNames.CREATE_PRODUCT_START,
});

export const createProduct_Success = (data) => ({
    type: actionNames.CREATE_PRODUCT_SUCCESS,
    payload: data,
});

export const createProduct_Failure = () => ({
    type: actionNames.CREATE_PRODUCT_FAILURE,
});

// READ PRODUCT
export const readProduct = (userId) => {
    return async (dispatch) => {
        dispatch(readProduct_Start());
        try {
            const res = await userService.readProduct(userId);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(readProduct_Success(data));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(readProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(readProduct_Failure());
            console.log('An error in readProduct() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const readProduct_Start = () => ({
    type: actionNames.READ_PRODUCT_START,
});

export const readProduct_Success = (data) => ({
    type: actionNames.READ_PRODUCT_SUCCESS,
    payload: data,
});

export const readProduct_Failure = () => ({
    type: actionNames.READ_PRODUCT_FAILURE,
});

// UPDATE PRODUCT
export const updateProduct = (productData, index, updatedItem) => {
    return async (dispatch) => {
        dispatch(updateProduct_Start());
        try {
            const res = await userService.updateProduct(productData);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                const reduxData = { productData, index, updatedItem };
                dispatch(updateProduct_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(updateProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(updateProduct_Failure());
            console.log('An error in updateProduct() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const updateProduct_Start = () => ({
    type: actionNames.UPDATE_PRODUCT_START,
});

export const updateProduct_Success = (data) => ({
    type: actionNames.UPDATE_PRODUCT_SUCCESS,
    payload: data,
});

export const updateProduct_Failure = () => ({
    type: actionNames.UPDATE_PRODUCT_FAILURE,
});

// DELETE PRODUCT
export const deleteProduct = (productId, index) => {
    return async (dispatch) => {
        dispatch(deleteProduct_Start());
        try {
            const res = await userService.deleteProduct(productId);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(deleteProduct_Success(index));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(deleteProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(deleteProduct_Failure());
            console.log('An error in deleteProduct() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const deleteProduct_Start = () => ({
    type: actionNames.DELETE_PRODUCT_START,
});

export const deleteProduct_Success = (index) => ({
    type: actionNames.DELETE_PRODUCT_SUCCESS,
    payload: index,
});

export const deleteProduct_Failure = () => ({
    type: actionNames.DELETE_PRODUCT_FAILURE,
});

// MOVE PRODUCT
export const moveProduct = (productData, index) => {
    return async (dispatch) => {
        dispatch(moveProduct_Start());
        try {
            const res = await userService.moveProduct(productData);
            const { errorCode, errorMessage } = res ?? {};

            if (errorCode === 0) {
                dispatch(moveProduct_Success(index));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(moveProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(moveProduct_Failure());
            console.log('An error in moveProduct() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const moveProduct_Start = () => ({
    type: actionNames.MOVE_PRODUCT_START,
});

export const moveProduct_Success = (data) => ({
    type: actionNames.MOVE_PRODUCT_SUCCESS,
    payload: data,
});

export const moveProduct_Failure = () => ({
    type: actionNames.MOVE_PRODUCT_FAILURE,
});

// =================================================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const createTechnology = (technologyData, index) => {
    return async (dispatch) => {
        try {
            let res = await userService.createTechnology(technologyData);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { data, index };
                dispatch(createTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(createTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            dispatch(createTechnology_Failure());
            console.log('An error in createTechnology() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const createTechnology_Success = (data) => ({
    type: actionNames.CREATE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const createTechnology_Failure = () => ({
    type: actionNames.CREATE_TECHNOLOGY_FAILURE,
});

// UPDATE TECHNOLOGY
export const updateTechnology = (technologyData, index) => {
    return async (dispatch) => {
        try {
            let res = await userService.updateTechnology(technologyData);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { data, index };
                dispatch(updateTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(updateTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            dispatch(updateTechnology_Failure());
            console.log('An error in updateTechnology() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const updateTechnology_Success = (data) => ({
    type: actionNames.UPDATE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const updateTechnology_Failure = () => ({
    type: actionNames.UPDATE_TECHNOLOGY_FAILURE,
});

// DELETE TECHNOLOGY
export const deleteTechnology = (technologyData, index) => {
    return async (dispatch) => {
        try {
            let res = await userService.deleteTechnology(technologyData);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { data, index };
                dispatch(deleteTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(deleteTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            dispatch(deleteTechnology_Failure());
            console.log('An error in deleteTechnology() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const deleteTechnology_Success = (data) => ({
    type: actionNames.DELETE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const deleteTechnology_Failure = () => ({
    type: actionNames.DELETE_TECHNOLOGY_FAILURE,
});
