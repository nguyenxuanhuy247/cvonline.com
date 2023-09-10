const actionMaker = (text_1, text_2) => {
    return {
        [`${text_1}_${text_2}_START`]: `${text_1}_${text_2}_START`,
        [`${text_1}_${text_2}_SUCCESS`]: `${text_1}_${text_2}_SUCCESS`,
        [`${text_1}_${text_2}_FAILURE`]: `${text_1}_${text_2}_FAILURE`,
    };
};

const actionNames = Object.freeze({
    // USER SIGN UP
    ...actionMaker(`USER`, `SIGNUP`),
    ...actionMaker(`DELETE`, `ACCOUNT`),

    // USER SIGN IN
    ...actionMaker(`USER`, `SIGNIN`),

    // USER CHANGE PASSWORD
    ...actionMaker(`USER`, `FORGOT_PASSWORD`),

    // USER SIGN OUT
    USER_SIGNOUT: 'USER_SIGNOUT',

    // =================================================================
    // SEARCH
    ...actionMaker(`READ`, `SEARCH`),
    // HOME LAYOUT
    ...actionMaker(`READ`, `HOME_LAYOUT`),
    // CV LAYOUT
    ...actionMaker(`READ`, `CV_LAYOUT`),
    // SEND CV BY EMAIL
    ...actionMaker(`SEND_CV`, `BY_EMAIL`),

    // =================================================================
    // USER INFORMATION
    ...actionMaker(`READ`, `USER_INFORMATION`),
    ...actionMaker(`UPDATE`, `USER_INFORMATION`),
    REMOVE_CV_FROM_HISTORY: 'REMOVE_CV_FROM_HISTORY',

    // PRODUCT LIST
    ...actionMaker(`CREATE`, `PRODUCT`),
    ...actionMaker(`READ`, `PRODUCT`),
    ...actionMaker(`UPDATE`, `PRODUCT`),
    ...actionMaker(`DELETE`, `PRODUCT`),
    ...actionMaker(`MOVE`, `PRODUCT`),

    // TECHNOLOGY
    ...actionMaker(`CREATE`, `TECHNOLOGY`),
    ...actionMaker(`UPDATE`, `TECHNOLOGY`),
    ...actionMaker(`DELETE`, `TECHNOLOGY`),

    ...actionMaker(`DRAG_DROP`, `TECHNOLOGY`),

    // =================================================================

    ...actionMaker(`VERIFY`, `EMAIL`),
    ...actionMaker(`VERIFY`, `ID`),
    ...actionMaker(`CHANGE`, `ID`),
    ...actionMaker(`VERIFY`, `CURRENT_PASSWORD`),

    // =================================================================
    // SEARCH
    CLEAR_SEARCH_RESULT: 'CLEAR_SEARCH_RESULT',
});

export default actionNames;
