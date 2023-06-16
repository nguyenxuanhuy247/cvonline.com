const actionMaker = (text_1, text_2) => {
    return {
        [`${text_1}_${text_2}_START`]: `${text_1}_${text_2}_START`,
        [`${text_1}_${text_2}_SUCCESS`]: `${text_1}_${text_2}_SUCCESS`,
        [`${text_1}_${text_2}_FAILURE`]: `${text_1}_${text_2}_FAILURE`,
    };
};

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

    // Library
    ...actionMaker(`CREATE`, `LIBRARY`),
    ...actionMaker(`READ`, `LIBRARY`),
    ...actionMaker(`UPDATE`, `LIBRARY`),
    ...actionMaker(`DELETE`, `LIBRARY`),

    // Source Code
    ...actionMaker(`CREATE`, `SOURCECODE`),
    ...actionMaker(`READ`, `SOURCECODE`),
    ...actionMaker(`UPDATE`, `SOURCECODE`),
    ...actionMaker(`DELETE`, `SOURCECODE`),

    // Programming Language
    ...actionMaker(`CREATE`, `PROGRAMMINGLANGUAGE`),
    ...actionMaker(`READ`, `PROGRAMMINGLANGUAGE`),
    ...actionMaker(`UPDATE`, `PROGRAMMINGLANGUAGE`),
    ...actionMaker(`DELETE`, `PROGRAMMINGLANGUAGE`),

    // Framework
    ...actionMaker(`CREATE`, `FRAMEWORK`),
    ...actionMaker(`READ`, `FRAMEWORK`),
    ...actionMaker(`UPDATE`, `FRAMEWORK`),
    ...actionMaker(`DELETE`, `FRAMEWORK`),
});

export default actionNames;
