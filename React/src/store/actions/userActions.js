import actionNames from './actionNames';
import * as userService from '~/services/userService.js';
import { Toast } from '~/components/Toast/Toast.js';

// USER SIGN IN
export const userSignIn = (userData) => {
    return async (dispatch) => {
        dispatch(userSignIn_Start());
        try {
            let res = await userService.postSignIn(userData);
            const { data } = res;
            dispatch(userSignIn_Success(data));
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
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
    type: actionNames.USER_SIGNIN_FAILURE,
});

// USER SIGN UP - CREATE USER INFORMATION
export const userSignUpStart = (userData) => {
    return async (dispatch) => {
        dispatch(userSignUp_Start());
        try {
            let res = await userService.postSignUp(userData);
            const { errorMessage } = res ?? {};
            Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
            dispatch(userSignUp_Success());
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
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
    type: actionNames.USER_SIGNUP_FAILURE,
});

// DELETE ACCOUNT
export const deleteAccount = (userId) => {
    return async (dispatch) => {
        dispatch(deleteAccount_Start());
        try {
            let res = await userService.deleteAccount(userId);
            const { errorMessage } = res ?? {};
            Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
            dispatch(deleteAccount_Success());
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(deleteAccount_Failure(errorCode));
            console.log('An error in deleteAccount() - userActions.js: ', error);
        }
    };
};

export const deleteAccount_Start = () => ({
    type: actionNames.DELETE_ACCOUNT_START,
});

export const deleteAccount_Success = () => ({
    type: actionNames.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccount_Failure = (errorCode) => ({
    type: actionNames.DELETE_ACCOUNT_FAILURE,
    payload: errorCode,
});

// FORGOT PASSWORD
export const userForgotPassword = (data) => {
    return async (dispatch) => {
        dispatch(userForgotPassword_Start());
        try {
            let res = await userService.postForgotPassword(data);
            const { errorCode } = res ?? {};
            dispatch(userForgotPassword_Success());

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode !== 32) {
                Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            }

            dispatch(userForgotPassword_Failure());
            console.log('An error in userForgotPassword() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const userForgotPassword_Start = () => ({
    type: actionNames.USER_FORGOT_PASSWORD_START,
});

export const userForgotPassword_Success = () => ({
    type: actionNames.USER_FORGOT_PASSWORD_SUCCESS,
});

export const userForgotPassword_Failure = () => ({
    type: actionNames.USER_FORGOT_PASSWORD_FAILURE,
});

// USER SIGN OUT
export const userSignOut = () => {
    return {
        type: actionNames.USER_SIGNOUT,
    };
};

// =================================================================
// SEARCH VALUE
export const readSearch = (searchValue) => {
    return async (dispatch) => {
        dispatch(readSearch_Start());
        try {
            const res = await userService.readSearch(searchValue);
            const { data } = res ?? {};
            dispatch(readSearch_Success(data));
        } catch (error) {
            const { errorCode, errorMessage, data } = error.response?.data ?? {};

            if (errorCode === 31) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else if (!errorCode) {
                Toast.TOP_RIGHT_ERROR('Vui lòng kiểm tra lại kết nối ☹️', 3000);
            }

            dispatch(readSearch_Failure(data));
            console.log('An error in readSearch() - userActions.js: ', error);
        }
    };
};

export const readSearch_Start = () => ({
    type: actionNames.READ_SEARCH_START,
});

export const readSearch_Success = (data) => ({
    type: actionNames.READ_SEARCH_SUCCESS,
    payload: data,
});

export const readSearch_Failure = () => ({
    type: actionNames.READ_SEARCH_FAILURE,
});

// READ HOME LAYOUT
export const readHomeLayout = () => {
    return async (dispatch) => {
        dispatch(readHomeLayout_Start());
        try {
            const res = await userService.readHomeLayout();
            const { data } = res ?? {};
            dispatch(readHomeLayout_Success(data));
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode !== 32) {
                Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3000);
            }

            dispatch(readHomeLayout_Failure());
            console.log('An error in readHomeLayout() - userActions.js: ', error);
        }
    };
};

export const readHomeLayout_Start = () => ({
    type: actionNames.READ_HOME_LAYOUT_START,
});

export const readHomeLayout_Success = (data) => ({
    type: actionNames.READ_HOME_LAYOUT_SUCCESS,
    payload: data,
});

export const readHomeLayout_Failure = () => ({
    type: actionNames.READ_HOME_LAYOUT_FAILURE,
});

// READ CV LAYOUT
export const readCVLayout = (userId) => {
    return async (dispatch) => {
        dispatch(readCVLayout_Start());
        try {
            const res = await userService.readCVLayout(userId);

            const { data } = res ?? {};
            dispatch(readCVLayout_Success(data));
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode !== 32) {
                Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            }

            dispatch(readCVLayout_Failure(errorCode));
            console.log('An error in readCVLayout() - userActions.js: ', error);
        }
    };
};

export const readCVLayout_Start = () => ({
    type: actionNames.READ_CV_LAYOUT_START,
});

export const readCVLayout_Success = (data) => ({
    type: actionNames.READ_CV_LAYOUT_SUCCESS,
    payload: data,
});

export const readCVLayout_Failure = (errorCode) => ({
    type: actionNames.READ_CV_LAYOUT_FAILURE,
    payload: errorCode,
});

// SEND CV BY EMAIL
export const SendCVByEmail = (data) => {
    return async (dispatch) => {
        dispatch(SendCVByEmail_Start());
        try {
            let res = await userService.SendCVByEmail(data);
            const { errorMessage } = res ?? {};
            Toast.TOP_CENTER_SUCCESS(errorMessage, 2500);
            dispatch(SendCVByEmailD_Success());
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(SendCVByEmail_Fail(errorCode));
            console.log('An error in SendCVByEmail() - userActions.js: ', error);
        }
    };
};

export const SendCVByEmail_Start = () => ({
    type: actionNames.SEND_CV_BY_EMAIL_START,
});

export const SendCVByEmailD_Success = () => ({
    type: actionNames.SEND_CV_BY_EMAIL_SUCCESS,
});

export const SendCVByEmail_Fail = (errorCode) => ({
    type: actionNames.SEND_CV_BY_EMAIL_FAILURE,
    payload: errorCode,
});

// =================================================================
// CRUD USER INFORMATION

// UPDATE USER INFORMATION
export const updateUserInformation = (userData) => {
    return async (dispatch) => {
        dispatch(updateUserInformation_Start());
        try {
            let res = await userService.updateUserInformation(userData);
            const { errorCode, data } = res ?? {};
            dispatch(updateUserInformation_Success(data));

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(updateUserInformation_Failure(errorCode));
            console.log('An error in updateUserInformation() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const updateUserInformation_Start = () => ({
    type: actionNames.UPDATE_USER_INFORMATION_START,
});

export const updateUserInformation_Success = (data) => ({
    type: actionNames.UPDATE_USER_INFORMATION_SUCCESS,
    payload: data,
});

export const updateUserInformation_Failure = (errorCode) => ({
    type: actionNames.UPDATE_USER_INFORMATION_FAILURE,
    payload: errorCode,
});

// =================================================================
// CRUD PRODUCT

// CREATE PRODUCT
export const createProduct = (userId) => {
    return async (dispatch) => {
        dispatch(createProduct_Start());
        try {
            const res = await userService.createProduct(userId);
            const { errorCode, data } = res ?? {};
            dispatch(createProduct_Success(data));

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(createProduct_Failure(errorCode));
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

export const createProduct_Failure = (errorCode) => ({
    type: actionNames.CREATE_PRODUCT_FAILURE,
    payload: errorCode,
});

// UPDATE PRODUCT
export const updateProduct = (productData, index, updatedItem) => {
    return async (dispatch) => {
        dispatch(updateProduct_Start());
        try {
            await userService.updateProduct(productData);
            const reduxData = { productData, index, updatedItem };
            dispatch(updateProduct_Success(reduxData));
        } catch (error) {
            const dataFormBE = error.response?.data ?? {};
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(updateProduct_Failure(dataFormBE));
            console.log('An error in updateProduct() - userActions.js: ', error);
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

export const updateProduct_Failure = (payload) => ({
    type: actionNames.UPDATE_PRODUCT_FAILURE,
    payload: payload,
});

// DELETE PRODUCT
export const deleteProduct = (userId, productId, index) => {
    return async (dispatch) => {
        dispatch(deleteProduct_Start());
        try {
            await userService.deleteProduct(userId, productId);
            dispatch(deleteProduct_Success(index));
        } catch (error) {
            const dataFormBE = error.response?.data ?? {};
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(deleteProduct_Failure(dataFormBE));
            console.log('An error in deleteProduct() - userActions.js: ', error);
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

export const deleteProduct_Failure = (payload) => ({
    type: actionNames.DELETE_PRODUCT_FAILURE,
    payload: payload,
});

// MOVE PRODUCT
export const moveProduct = (productData, index) => {
    return async (dispatch) => {
        dispatch(moveProduct_Start());
        try {
            const res = await userService.moveProduct(productData);
            const { errorCode } = res ?? {};
            dispatch(moveProduct_Success(index));

            return errorCode;
        } catch (error) {
            const dataFormBE = error.response?.data ?? {};
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(moveProduct_Failure(dataFormBE));
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

export const moveProduct_Failure = (payload) => ({
    type: actionNames.MOVE_PRODUCT_FAILURE,
    payload: payload,
});

// =================================================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const createTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.createTechnology(technologyData);
            const { errorCode, data: dataFromDB } = res ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(createTechnology_Success(reduxData));

            return errorCode;
        } catch (error) {
            const dataFromDB = error.response?.data ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(createTechnology_Failure(reduxData));
            Toast.TOP_RIGHT_ERROR(dataFromDB?.errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            console.log('An error in createTechnology() - userActions.js: ', error);

            return dataFromDB?.errorCode;
        }
    };
};

export const createTechnology_Success = (data) => ({
    type: actionNames.CREATE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const createTechnology_Failure = (payload) => ({
    type: actionNames.CREATE_TECHNOLOGY_FAILURE,
    payload: payload,
});

// UPDATE TECHNOLOGY
export const updateTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.updateTechnology(technologyData);
            const { errorCode, data: dataFromDB } = res ?? {};

            const reduxData = { productIndex, dataFromDB };
            dispatch(updateTechnology_Success(reduxData));

            return errorCode;
        } catch (error) {
            const dataFromDB = error.response?.data ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(updateTechnology_Failure(reduxData));
            Toast.TOP_RIGHT_ERROR(dataFromDB?.errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            console.log('An error in updateTechnology() - userActions.js: ', error);

            return dataFromDB?.errorCode;
        }
    };
};

export const updateTechnology_Success = (data) => ({
    type: actionNames.UPDATE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const updateTechnology_Failure = (payload) => ({
    type: actionNames.UPDATE_TECHNOLOGY_FAILURE,
    payload: payload,
});

// DELETE TECHNOLOGY
export const deleteTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.deleteTechnology(technologyData);
            const { data: dataFromDB } = res ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(deleteTechnology_Success(reduxData));
        } catch (error) {
            const dataFromDB = error.response?.data ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(deleteTechnology_Failure(reduxData));
            Toast.TOP_RIGHT_ERROR(dataFromDB?.errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            console.log('An error in deleteTechnology() - userActions.js: ', error);
        }
    };
};

export const deleteTechnology_Success = (data) => ({
    type: actionNames.DELETE_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const deleteTechnology_Failure = (payload) => ({
    type: actionNames.DELETE_TECHNOLOGY_FAILURE,
    payload: payload,
});

// DRAG AND DROP TECHNOLOGY
export const dragAndDropTechology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.dragAndDropTechology(technologyData);
            const { data: dataFromDB } = res ?? {};

            const reduxData = { dataFromDB, productIndex };
            dispatch(dragAndDropTechology_Success(reduxData));
        } catch (error) {
            const dataFromDB = error.response?.data ?? {};
            const reduxData = { productIndex, dataFromDB };
            dispatch(dragAndDropTechology_Failure(reduxData));
            Toast.TOP_RIGHT_ERROR(dataFromDB?.errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            console.log('An error in dragAndDropTechology() - userActions.js: ', error);
        }
    };
};

export const dragAndDropTechology_Success = (data) => ({
    type: actionNames.DRAG_DROP_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const dragAndDropTechology_Failure = (payload) => ({
    type: actionNames.DRAG_DROP_TECHNOLOGY_FAILURE,
    payload: payload,
});

// =================================================================
// CHANGE USER ID
export const changeUserID = (data) => {
    return async (dispatch) => {
        dispatch(changeUserID_Start());
        try {
            let res = await userService.changeUserID(data);
            const { errorCode, errorMessage } = res ?? {};
            Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
            dispatch(changeUserID_Success(data.newID));

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_RIGHT_ERROR(errorMessage || 'Vui lòng kiểm tra lại kết nối ☹️', 3500);
            dispatch(changeUserID_Failure(errorCode));
            console.log('An error in changeUserID() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const changeUserID_Start = () => ({
    type: actionNames.CHANGE_ID_START,
});

export const changeUserID_Success = (data) => ({
    type: actionNames.CHANGE_ID_SUCCESS,
    payload: data,
});

export const changeUserID_Failure = (errorCode) => ({
    type: actionNames.CHANGE_ID_FAILURE,
    payload: errorCode,
});
