import actionNames from './actionNames';
import * as appService from '~/services/appService.js';
import { Toast } from '~/components/Toast/Toast.js';

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
            }
        } catch (error) {
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
