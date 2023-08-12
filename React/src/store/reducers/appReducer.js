import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        verifiedUserID: false,
        verifiedUserEmail: false,
    },
    isUserIDVerified: true,
    isUserEmailVerified: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default appReducer;
