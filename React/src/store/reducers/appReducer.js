import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        verifiedUserID: false,
    },
    isUserIDVerified: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default appReducer;
