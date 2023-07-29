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
        dispatch({ type: 'USER_SIGNUP_START' });
        try {
            let res = await userService.postSignUp(userData);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                Toast.TOP_CENTER_SUCCESS(errorMessage, 2000);
                dispatch(userSignUpSuccess());
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 3000);
                dispatch(userSignUpFail());
            }
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage || error.message, 3000);
            dispatch(userSignUpFail());
            console.log('An error in userSignUpStart() - userActions.js: ', error);
        }
    };
};

export const userSignUpSuccess = () => ({
    type: 'USER_SIGNUP_SUCCESS',
});

export const userSignUpFail = () => ({
    type: 'USER_SIGNUP_FAIL',
});

// USER SIGN IN
export const userSignInStart = (userData) => {
    return async (dispatch) => {
        dispatch({ type: 'USER_SIGNIN_START' });
        try {
            let res = await userService.postSignIn(userData);
            const { errorCode, errorMessage, data } = res;
            if (errorCode === 0) {
                dispatch(userSignInSuccess(data));
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 3000);
                dispatch(userSignInFail());
            }
        } catch (error) {
            const { errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 3000);
            dispatch(userSignInFail());
            console.log('An error in userSignInStart() - userActions.js: ', error);
        }
    };
};

export const userSignInSuccess = (user) => ({
    type: 'USER_SIGNIN_SUCCESS',
    payload: user,
});

export const userSignInFail = () => ({
    type: 'USER_SIGNIN_FAIL',
});

// USER SIGN OUT
export const userSignOut = () => {
    return {
        type: 'USER_SIGNOUT',
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
            const { errorCode, data } = res ?? {};

            dispatch(ReadUserInformation_Success(data));

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            console.log('An error in readUserInformation() - userActions.js: ', error);

            return errorCode;
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
// CRUD PRODUCT LIST

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
    type: `CREATE_PRODUCT_START`,
});

export const createProduct_Success = (data) => ({
    type: `CREATE_PRODUCT_SUCCESS`,
    payload: data,
});

export const createProduct_Failure = () => ({
    type: `CREATE_PRODUCT_FAILURE`,
});

// READ PRODUCT LIST
export const readProductList = (userId) => {
    return async (dispatch) => {
        dispatch(readProductList_Start());
        try {
            const res = await userService.readProductList(userId);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                dispatch(readProductList_Success(data));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(readProductList_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(readProductList_Failure());
            console.log('An error in readProductList() - userActions.js: ', error);

            return errorCode;
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
    type: `UPDATE_PRODUCT_START`,
});

export const updateProduct_Success = (data) => ({
    type: `UPDATE_PRODUCT_SUCCESS`,
    payload: data,
});

export const updateProduct_Failure = () => ({
    type: `UPDATE_PRODUCT_FAILURE`,
});

// DELETE PRODUCT
export const deleteProduct = (productId) => {
    return async (dispatch) => {
        dispatch(deleteProduct_Start());
        try {
            const res = await userService.deleteProduct(productId);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(deleteProduct_Success(productId));

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
    type: `DELETE_PRODUCT_START`,
});

export const deleteProduct_Success = (productId) => ({
    type: `DELETE_PRODUCT_SUCCESS`,
    payload: productId,
});

export const deleteProduct_Failure = () => ({
    type: `DELETE_PRODUCT_FAILURE`,
});

// MOVE PRODUCT
export const moveProduct = (userData, index) => {
    return async (dispatch) => {
        dispatch(moveProduct_Start());
        try {
            const res = await userService.moveProduct(userData);
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
    type: `MOVE_PRODUCT_START`,
});

export const moveProduct_Success = (data) => ({
    type: `MOVE_PRODUCT_SUCCESS`,
    payload: data,
});

export const moveProduct_Failure = () => ({
    type: `MOVE_PRODUCT_FAILURE`,
});

// =================================================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const createTechnology = (data) => {
    return async (dispatch) => {
        dispatch(createTechnology_Start());
        try {
            let res = await userService.createTechnology(data);
            const { errorCode, errorMessage } = res ?? {};
            if (errorCode === 0) {
                dispatch(createTechnology_Success(data));

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

export const createTechnology_Start = () => ({
    type: `CREATE_TECHNOLOGY_START`,
});

export const createTechnology_Success = (data) => ({
    type: `CREATE_TECHNOLOGY_SUCCESS`,
    payload: data,
});

export const createTechnology_Failure = () => ({
    type: `CREATE_TECHNOLOGY_FAILURE`,
});

// READ TECHNOLOGY
export const readTechnology = (technologyData, index) => {
    return async (dispatch) => {
        dispatch(readTechnology_Start());
        try {
            const res = await userService.readTechnology(technologyData);
            const { errorCode, errorMessage, data } = res ?? {};

            if (errorCode === 0) {
                const reduxData = { index, data };
                dispatch(readTechnology_Success(data));

                return errorCode;
            } else {
                Toast.TOP_CENTER_ERROR(errorMessage, 4000);
                dispatch(readTechnology_Failure());

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 4000);
            dispatch(readTechnology_Failure());
            console.log('An error in readTechnology() - userActions.js: ', error);

            return errorCode;
        }
    };
};

export const readTechnology_Start = () => ({
    type: `READ_TECHNOLOGY_START`,
});

export const readTechnology_Success = (data) => ({
    type: `READ_TECHNOLOGY_SUCCESS`,
    payload: data,
});

export const readTechnology_Failure = () => ({
    type: `READ_TECHNOLOGY_FAILURE`,
});

// UPDATE TECHNOLOGY
export const updateTechnology = (data) => {
    return async () => {
        try {
            let res = await userService.updateTechnology(data);
            const { errorCode } = res ?? {};

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            console.log('An error in updateTechnology() - userActions.js: ', error);
            return errorCode;
        }
    };
};

// DELETE TECHNOLOGY
export const deleteTechnology = (technologyId, label) => {
    return async () => {
        try {
            let res = await userService.deleteTechnology(technologyId, label);
            const { errorCode } = res ?? {};

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            Toast.TOP_CENTER_ERROR(errorMessage, 5000);
            console.log('An error in deleteTechnology() - userActions.js: ', error);
            return errorCode;
        }
    };
};
