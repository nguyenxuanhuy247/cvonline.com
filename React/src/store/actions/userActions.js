import actionNames from './actionNames';
import * as userService from '~/services/userService.js';
import { Toast } from '~/components/Toast/Toast.js';

// USER SIGN IN
export const userSignIn = (userData) => {
    return async (dispatch) => {
        dispatch(userSignIn_Start());
        try {
            let res = await userService.postSignIn(userData);
            const { errorCode, errorMessage, data } = res;
            if (errorCode === 0) {
                dispatch(userSignIn_Success(data));
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(userSignIn_Fail());
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
                dispatch(userSignUp_Success());
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(userSignUp_Fail());
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(deleteAccount_Success());

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(deleteAccount_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            dispatch(userForgotPassword_Failure());
            console.log('An error in deleteAccount() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const deleteAccount_Start = () => ({
    type: actionNames.DELETE_ACCOUNT_START,
});

export const deleteAccount_Success = () => ({
    type: actionNames.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccount_Failure = () => ({
    type: actionNames.DELETE_ACCOUNT_FAILURE,
});

// FORGOT PASSWORD
export const userForgotPassword = (data) => {
    return async (dispatch) => {
        dispatch(userForgotPassword_Start());
        try {
            let res = await userService.postForgotPassword(data);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(userForgotPassword_Success());

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(userForgotPassword_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
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
            const { errorCode, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(readSearch_Success(data));
            } else {
                dispatch(readSearch_Failure(data));
            }
        } catch (error) {
            const { errorCode, errorMessage, data } = error.response?.data ?? {};

            if (errorCode === 31) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else if (!errorCode) {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
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

            const { errorCode, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(readHomeLayout_Success(data));
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
                dispatch(readHomeLayout_Failure());
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
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

// =================================================================
// CRUD USER INFORMATION

// READ USER INFORMATION
export const readUserInformation = (userId) => {
    return async (dispatch) => {
        try {
            const res = await userService.readUserInformation(userId);

            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(readUserInformation_Success(data));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(readUserInformation_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            dispatch(readUserInformation_Failure());
            console.log('An error in readUserInformation() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const readUserInformation_Success = (data) => ({
    type: actionNames.READ_USER_INFORMATION_SUCCESS,
    payload: data,
});

export const readUserInformation_Failure = (data) => ({
    type: actionNames.READ_USER_INFORMATION_FAILURE,
    payload: data,
});

// UPDATE USER INFORMATION
export const updateUserInformation = (userData) => {
    return async (dispatch) => {
        dispatch(updateUserInformation_Start());
        try {
            let res = await userService.updateUserInformation(userData);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(updateUserInformation_Success(data));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(updateUserInformation_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            dispatch(updateUserInformation_Failure());
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

export const updateUserInformation_Failure = () => ({
    type: actionNames.UPDATE_USER_INFORMATION_FAILURE,
});

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
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(createProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(readProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(updateProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(deleteProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(moveProduct_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
export const createTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.createTechnology(technologyData);
            const { errorCode, errorMessage, data: dataFromDB } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { dataFromDB, productIndex };
                dispatch(createTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(createTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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
export const updateTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.updateTechnology(technologyData);
            const { errorCode, errorMessage, data: dataFromDB } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { dataFromDB, productIndex };
                dispatch(updateTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(updateTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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

// DRAG AND DROP TECHNOLOGY
export const dragAndDropTechology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.dragAndDropTechology(technologyData);
            const { errorCode, errorMessage, data: dataFromDB } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { dataFromDB, productIndex };
                dispatch(dragAndDropTechology_Success(reduxData));
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(dragAndDropTechology_Failure());
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            dispatch(dragAndDropTechology_Failure());
            console.log('An error in dragAndDropTechology() - userActions.js: ', error);
        }
    };
};

export const dragAndDropTechology_Success = (data) => ({
    type: actionNames.DRAG_DROP_TECHNOLOGY_SUCCESS,
    payload: data,
});

export const dragAndDropTechology_Failure = () => ({
    type: actionNames.DRAG_DROP_TECHNOLOGY_FAILURE,
});

// DELETE TECHNOLOGY
export const deleteTechnology = (technologyData, productIndex) => {
    return async (dispatch) => {
        try {
            let res = await userService.deleteTechnology(technologyData);
            const { errorCode, errorMessage, data: dataFromDB } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { dataFromDB, productIndex };
                dispatch(deleteTechnology_Success(reduxData));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(deleteTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

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

// =================================================================
// CHANGE USER ID
export const changeUserID = (data) => {
    return async (dispatch) => {
        dispatch(changeUserID_Start());
        try {
            let res = await userService.changeUserID(data);
            const { errorCode, errorMessage, data: DB_Data } = res ?? {};
            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
                dispatch(changeUserID_Success(DB_Data));

                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                dispatch(changeUserID_Fail());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            dispatch(changeUserID_Fail());
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

export const changeUserID_Fail = () => ({
    type: actionNames.CHANGE_ID_FAILURE,
});

// =================================================================
// SEND CV BY EMAIL
export const SendCVByEmail = (data) => {
    return async (dispatch) => {
        dispatch(changeUserID_Start());
        try {
            let res = await userService.SendCVByEmail(data);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
                return errorCode;
            } else {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode) {
                Toast.TOP_RIGHT_ERROR(errorMessage, 3000);
            } else {
                Toast.TOP_RIGHT_ERROR('Xảy ra lỗi! Vui lòng thử lại', 3000);
            }

            console.log('An error in SendCVByEmail() - userActions.js: ', error);
            return errorCode;
        }
    };
};
