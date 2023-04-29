import actionTypes from './actionNames';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userData) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userData: userData,
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
})
