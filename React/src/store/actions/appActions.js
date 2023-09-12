import actionNames from './actionNames';
import * as appService from '~/services/appService.js';
import { Toast } from '~/components/Toast/Toast.js';

// VERIFY USER EMAIL
export const verifyUserEmail = (userEmail) => {
    return async (dispatch) => {
        dispatch(verifyUserEmail_Start());
        try {
            await appService.verifyUserEmail(userEmail);
            dispatch(verifyUserEmail_Success());
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            dispatch(verifyUserEmail_Fail());
            console.log('An error in verifyUserEmail() - appActions.js: ', error);

            if (errorCode === 31 || errorCode === 11) {
                Toast.TOP_CENTER_ERROR(errorMessage, 3500);
                return errorCode;
            } else if (!errorCode) {
                Toast.TOP_CENTER_ERROR('Không kết nối được với Server ☹️', 3500);

                return 100;
            }
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
            await appService.verifyUserID(userID);
            dispatch(verifyUserID_Success());
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};
            if (errorCode !== 32) {
                Toast.TOP_CENTER_ERROR(errorMessage || 'Không kết nối được với Server ☹️', 3500);
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
            dispatch(verifyCurrentPassword_Success());

            return errorCode;
        } catch (error) {
            const { errorCode, errorMessage } = error.response?.data ?? {};

            if (errorCode === 10 || errorCode === 32) {
                Toast.TOP_CENTER_ERROR(errorMessage, 3500);
            } else if (!errorCode || errorCode !== 33) {
                Toast.TOP_CENTER_ERROR(errorMessage || 'Không kết nối được với Server ☹️', 3500);
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
