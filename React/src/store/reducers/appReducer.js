import actionNames from "../actions/actionNames";

const initialState = {
    started: true,
    language: "vi",
    systemMenuPath: "/system/user-manage",
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true,
            };
        case actionNames.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal,
                },
            };

        case actionNames.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        default:
            return state;
    }
};

export default appReducer;
