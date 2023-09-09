import actionNames from './actionNames';
import * as appService from '~/services/appService.js';
import { Toast } from '~/components/Toast/Toast.js';

// VERIFY USER EMAIL
export const verifyUserEmail = (userEmail) => {
    return async (dispatch) => {
        dispatch(verifyUserEmail_Start());
        try {
            let res = await appService.verifyUserEmail(userEmail);
            const { errorCode } = res ?? {};
            if (errorCode === 0) {
                dispatch(verifyUserEmail_Success());

                return errorCode;
            } else {
                dispatch(verifyUserEmail_Fail());
                Toast.TOP_CENTER_ERROR('Xảy ra lỗi! Không xác thực được email', 3000);

                return errorCode;
            }
        } catch (error) {
            const { errorCode } = error.response?.data ?? {};
            if (errorCode !== 32) {
                Toast.TOP_CENTER_ERROR(error.message || 'Lỗi kết nối! Vui lòng thử lại ☹️', 3000);
            }
            dispatch(verifyUserEmail_Fail());
            console.log('An error in verifyUserEmail() - appActions.js: ', error);

            return errorCode;
        }
    };
};

export const verifyUserEmail_Start = () => ({
    type: actionNames.VERIFY_EMAIL_START,
});

export const verifyUserEmail_Success = () => ({
    type: actionNames.VERIFY_EMAIL_SUCCESS,
});

export const verifyUserEmail_Fail = () => ({
    type: actionNames.VERIFY_EMAIL_FAILURE,
});

// =================================================================
// VERIFY USER ID
export const verifyUserID = (userID) => {
    return async (dispatch) => {
        dispatch(verifyUserID_Start());
        try {
            let res = await appService.verifyUserID(userID);
            const { errorCode } = res ?? {};
            if (errorCode === 0) {
                dispatch(verifyUserID_Success());
            } else {
                dispatch(verifyUserID_Fail());
                Toast.TOP_CENTER_ERROR('Lỗi kết nối! Vui lòng thử lại ☹️', 3000);
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            if (errorCode !== 32) {
                Toast.TOP_CENTER_ERROR(errorMessage || 'Lỗi kết nối! Vui lòng thử lại ☹️', 3000);
            }

            dispatch(verifyUserID_Fail());
            console.log('An error in verifyUserID() - appActions.js: ', error);
        }
    };
};

export const verifyUserID_Start = () => ({
    type: actionNames.VERIFY_ID_START,
});

export const verifyUserID_Success = () => ({
    type: actionNames.VERIFY_ID_SUCCESS,
});

export const verifyUserID_Fail = () => ({
    type: actionNames.VERIFY_ID_FAILURE,
});

// =================================================================
// VERIFY CURRENT PASSWORD
export const verifyCurrentPassword = (data) => {
    return async (dispatch) => {
        dispatch(verifyCurrentPassword_Start());
        try {
            let res = await appService.verifyCurrentPassword(data);
            const { errorCode } = res ?? {};
            if (errorCode === 0) {
                dispatch(verifyCurrentPassword_Success());

                return errorCode;
            } else {
                dispatch(verifyCurrentPassword_Fail());
                Toast.TOP_CENTER_ERROR('Xảy ra lỗi! Không xác thực được mật khẩu hiện tại', 3000);

                return errorCode;
            }
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            if (errorCode !== 32 && errorCode !== 33) {
                Toast.TOP_CENTER_ERROR(errorMessage || 'Lỗi kết nối! Vui lòng thử lại ☹️', 3000);
            }

            dispatch(verifyCurrentPassword_Fail());
            console.log('An error in verifyCurrentPassword() - appActions.js: ', error);

            return errorCode;
        }
    };
};

export const verifyCurrentPassword_Start = () => ({
    type: actionNames.VERIFY_CURRENT_PASSWORD_START,
});

export const verifyCurrentPassword_Success = () => ({
    type: actionNames.VERIFY_CURRENT_PASSWORD_SUCCESS,
});

export const verifyCurrentPassword_Fail = () => ({
    type: actionNames.VERIFY_CURRENT_PASSWORD_FAILURE,
});
