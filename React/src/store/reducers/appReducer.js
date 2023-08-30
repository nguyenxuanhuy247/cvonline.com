import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        verifiedUserID: false,
        verifiedUserEmail: false,
        verifiedCurrentPassword: false,
    },
    isUserIDVerified: true,
    isUserEmailVerified: true,
    isCurrentPasswordVerified: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        // VERIFY USER EMAIL
        case actionNames.VERIFY_EMAIL_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserEmail: true },
            };
        case actionNames.VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserEmail: false },
                isUserEmailVerified: true,
            };
        case actionNames.VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserEmail: false },
                isUserEmailVerified: false,
            };

        // VERIFY USER ID
        case actionNames.VERIFY_ID_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserID: true },
            };
        case actionNames.VERIFY_ID_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserID: false },
                isUserIDVerified: true,
            };
        case actionNames.VERIFY_ID_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedUserID: false },
                isUserIDVerified: false,
            };

        // VERIFY CURRENT PASSWORD
        case actionNames.VERIFY_CURRENT_PASSWORD_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedCurrentPassword: true },
            };
        case actionNames.VERIFY_CURRENT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedCurrentPassword: false },
                isCurrentPasswordVerified: true,
            };
        case actionNames.VERIFY_CURRENT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, verifiedCurrentPassword: false },
                isCurrentPasswordVerified: false,
            };

        default:
            return state;
    }
};

export default appReducer;
