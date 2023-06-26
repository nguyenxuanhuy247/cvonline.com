const actionMaker = (text_1, text_2) => {
    return {
        [`${text_1}_${text_2}_START`]: `${text_1}_${text_2}_START`,
        [`${text_1}_${text_2}_SUCCESS`]: `${text_1}_${text_2}_SUCCESS`,
        [`${text_1}_${text_2}_FAILURE`]: `${text_1}_${text_2}_FAILURE`,
    };
};

const actionNames = Object.freeze({
    // USER SIGN IN
    USER_SIGNUP_START: 'USER_SIGNUP_START',
    USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
    USER_SIGNUP_FAIL: 'USER_SIGNUP_FAIL',

    // USER SIGN UP
    USER_SIGNIN_START: 'USER_SIGNIN_START',
    USER_SIGNIN_SUCCESS: 'USER_SIGNIN_SUCCESS',
    USER_SIGNIN_FAIL: 'USER_SIGNIN_FAIL',

    // USER SIGN OUT
    USER_SIGNOUT: 'USER_SIGNOUT',

    // USER INFORMATION
    ...actionMaker(`READ`, `PRODUCT_LIST`),

    // USER INFORMATION
    ...actionMaker(`CREATE`, `USER_INFORMATION`),
    ...actionMaker(`READ`, `USER_INFORMATION`),
    ...actionMaker(`UPDATE`, `USER_INFORMATION`),
    ...actionMaker(`DELETE`, `USER_INFORMATION`),

    // LIBRARY
    ...actionMaker(`CREATE`, `LIBRARY`),
    ...actionMaker(`READ`, `LIBRARY`),
    ...actionMaker(`UPDATE`, `LIBRARY`),
    ...actionMaker(`DELETE`, `LIBRARY`),

    // SOURCE CODE
    ...actionMaker(`CREATE`, `SOURCECODE`),
    ...actionMaker(`READ`, `SOURCECODE`),
    ...actionMaker(`UPDATE`, `SOURCECODE`),
    ...actionMaker(`DELETE`, `SOURCECODE`),

    // FRONTEND TECHNOLOGY
    ...actionMaker(`CREATE`, `FRONTEND_TECHNOLOGY`),
    ...actionMaker(`READ`, `FRONTEND_TECHNOLOGY`),
    ...actionMaker(`UPDATE`, `FRONTEND_TECHNOLOGY`),
    ...actionMaker(`DELETE`, `FRONTEND_TECHNOLOGY`),

    // BACKEND TECHNOLOGY
    ...actionMaker(`CREATE`, `BACKEND_TECHNOLOGY`),
    ...actionMaker(`READ`, `BACKEND_TECHNOLOGY`),
    ...actionMaker(`UPDATE`, `BACKEND_TECHNOLOGY`),
    ...actionMaker(`DELETE`, `BACKEND_TECHNOLOGY`),
});

export default actionNames;
