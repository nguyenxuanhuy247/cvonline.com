import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        CVLayout: false,
    },
    isSignIn: false,
    user: null,
    productList: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER CHANGE PASSWORD
        case actionNames.USER_CHANGE_PASSWORD_START:
            return {
                ...state,
            };
        case actionNames.USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                user: { ...state.user, isPasword: true },
            };
        case actionNames.USER_CHANGE_PASSWORD_FAIL:
            return {
                ...state,
            };

        // USER SIGN IN
        case actionNames.USER_SIGNIN_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: true },
            };
        case actionNames.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
                isSignIn: true,
                user: action.payload,
            };
        case actionNames.USER_SIGNIN_FAIL:
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
            };

        // USER SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
            };

        // =================================================================
        // READ USER INFORMATION
        case actionNames.READ_USER_INFORMATION_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.READ_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                user: action.payload,
            };
        case actionNames.READ_USER_INFORMATION_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // =================================================================
        // READ PRODUCT LIST
        case actionNames.READ_PRODUCT_LIST_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.READ_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: action.payload,
            };
        case actionNames.READ_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: [],
            };

        default:
            return state;
    }
};

export default userReducer;
