const actionMaker = (text_1, text_2) => {
    return {
        [`${text_1}_${text_2}_START`]: `${text_1}_${text_2}_START`,
        [`${text_1}_${text_2}_SUCCESS`]: `${text_1}_${text_2}_SUCCESS`,
        [`${text_1}_${text_2}_FAILURE`]: `${text_1}_${text_2}_FAILURE`,
    };
};

const actionNames = Object.freeze({
    // USER SIGN IN
    ...actionMaker(`USER`, `SIGNIN`),

    // USER CHANGE PASSWORD
    ...actionMaker(`USER`, `CHANGE_PASSWORD`),

    // USER SIGN OUT
    USER_SIGNOUT: 'USER_SIGNOUT',

    // PRODUCT LIST
    ...actionMaker(`READ`, `PRODUCT_LIST`),
    ...actionMaker(`DELETE`, `PRODUCT_LIST`),

    // USER INFORMATION
    ...actionMaker(`READ`, `USER_INFORMATION`),
    ...actionMaker(`UPDATE`, `USER_INFORMATION`),

    // TECHNOLOGY
    ...actionMaker(`CREATE`, `TECHNOLOGY`),
    ...actionMaker(`UPDATE`, `TECHNOLOGY`),
    ...actionMaker(`DELETE`, `TECHNOLOGY`),
});

export default actionNames;
