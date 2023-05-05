import actionNames from '../actions/actionNames';

const initialState = {
    isSignIn: false,
    isSignUp: false,
    isLoading: false,
    signUpMessage: {},
    signInMessage: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sign Up
        case actionNames.USER_SIGNUP_START:
            return {
                ...state,
                isLoading: true,
                signUpMessage: action.payload,
            };
        case actionNames.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isSignUp: true,
                isLoading: false,
                signUpMessage: action.payload,
            };
        case actionNames.USER_SIGNUP_FAIL:
            return {
                ...state,
                isSignUp: false,
                isLoading: false,
                signUpMessage: action.payload,
            };
        case actionNames.REMOVE_SIGNUP_MESSAGE:
            return {
                ...state,
                isSignUp: false,
                signUpMessage: action.payload,
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
                signInMessage: action.payload,
            };
        case actionNames.USER_SIGNIN_FAIL:
            return {
                ...state,
                isSignIn: false,
                isLoading: false,
                signInMessage: action.payload,
            };
        case actionNames.REMOVE_SIGNIN_MESSAGE:
            return {
                ...state,
                isSignIn: false,
                signInMessage: action.payload,
            };

        // Sign Out
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
            };
        default:
            return state;
    }
};

export default userReducer;
