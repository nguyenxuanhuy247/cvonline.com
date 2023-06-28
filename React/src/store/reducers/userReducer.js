import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        user: false,
        productList: false,
        technologyList: false,
    },
    isSignUp: false,
    isSignIn: false,
    user: null,
    productList: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER SIGN UP
        case actionNames.USER_SIGNUP_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: true },
            };
        case actionNames.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
                isSignUp: true,
            };
        case actionNames.USER_SIGNUP_FAIL:
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
                isSignUp: false,
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
                isSignIn: false,
                isLoading: { ...state.isLoading, signin: false },
            };

        // USER SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
                isSignUp: false,
            };
        // =================================================================
        // READ PRODUCT LIST
        case actionNames.READ_PRODUCT_LIST_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, productList: true },
            };
        case actionNames.READ_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, productList: false },
                productList: action.payload,
            };
        case actionNames.READ_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, productList: false },
            };

        // =================================================================
        // READ USER INFORMATION
        case actionNames.READ_USER_INFORMATION_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, user: true },
            };
        case actionNames.READ_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, user: false },
                user: action.payload.data,
            };
        case actionNames.READ_USER_INFORMATION_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, user: false },
            };

        // UPDATE USER INFORMATION
        case actionNames.UPDATE_USER_INFORMATION_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, user: true },
            };
        case actionNames.UPDATE_USER_INFORMATION_SUCCESS:
        case actionNames.UPDATE_USER_INFORMATION_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, user: false },
            };
        default:
            return state;
    }
};

export default userReducer;
