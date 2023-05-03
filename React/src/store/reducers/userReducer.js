import actionNames from '../actions/actionNames';

const initialState = {
    isSignIn: false,
    isSignUp: false,
    isLoading: false,
    userSignInData: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sign Up
        case actionNames.USER_SIGNUP_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionNames.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isSignUp: true,
                isLoading: false,
            };
        case actionNames.USER_SIGNUP_FAIL:
            return {
                ...state,
                isSignUp: false,
                isLoading: false,
            };

        // Sign In
        case actionNames.USER_SIGNIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionNames.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isSignIn: true,
                isLoading: false,
                userSignInData: action.payload,
            };
        case actionNames.USER_SIGNIN_FAIL:
            return {
                ...state,
                isSignIn: false,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default userReducer;
