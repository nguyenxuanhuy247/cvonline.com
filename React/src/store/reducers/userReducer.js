import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        CVLayout: false,
    },
    isSignIn: false,
    isSignUp: false,
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

        // USER SIGN UP
        case 'USER_SIGNUP_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: true },
            };
        case 'USER_SIGNUP_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
                isSignUp: true,
            };
        case 'USER_SIGNUP_FAIL':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
            };

        // USER SIGN IN
        case 'USER_SIGNIN_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: true },
            };
        case 'USER_SIGNIN_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
                isSignIn: true,
                user: action.payload,
            };
        case 'USER_SIGNIN_FAIL':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
            };

        // USER SIGN OUT
        case 'USER_SIGNOUT':
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
