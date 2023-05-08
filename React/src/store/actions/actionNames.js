const actionNames = Object.freeze({
    // User - Sign In
    USER_SIGNUP_START: 'USER_SIGNUP_START',
    USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
    USER_SIGNUP_FAIL: 'USER_SIGNUP_FAIL',

    //user - Sign Up
    USER_SIGNIN_START: 'USER_SIGNIN_START',
    USER_SIGNIN_SUCCESS: 'USER_SIGNIN_SUCCESS',
    USER_SIGNIN_FAIL: 'USER_SIGNIN_FAIL',

    // Remove error message
    REMOVE_SIGNUP_MESSAGE: 'REMOVE_SIGNUP_MESSAGE',
    REMOVE_SIGNIN_MESSAGE: 'REMOVE_SIGNIN_MESSAGE',

    //user - Sign Out
    USER_SIGNOUT: 'USER_SIGNOUT',

    // User - Make CV
    USER_CHANGE_JOB_TITLE: 'USER_CHANGE_JOB_TITLE',
    USER_CHANGE_COMPANY_NAME: 'USER_CHANGE_COMPANY_NAME',
    USER_CHANGE_JOB_POSITION: 'USER_CHANGE_JOB_POSITION',
    USER_CHANGE_PRODUCT_DESC: 'USER_CHANGE_PRODUCT_DESC',
});

export default actionNames;
