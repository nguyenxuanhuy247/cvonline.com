import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        createLibrary: false,
        readLibrary: false,
        updateLibrary: false,
    },
    isSignUp: false,
    signUpMessage: {},
    isSignIn: false,
    signInMessage: {},
    libraries: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER SIGN UP
        case actionNames.USER_SIGNUP_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionNames.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSignUp: true,
                signUpMessage: action.payload,
            };
        case actionNames.USER_SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                isSignUp: false,
                signUpMessage: action.payload,
            };
        case actionNames.REMOVE_SIGNUP_MESSAGE:
            return {
                ...state,
                isSignUp: false,
                signUpMessage: action.payload,
            };

        // USER SIGN IN
        case actionNames.USER_SIGNIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionNames.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSignIn: true,
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

        // USER SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
                isSignUp: false,
            };

        // LIBRARY
        case actionNames.CREATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, createLibrary: true },
            };
        case actionNames.CREATE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, createLibrary: false },
                libraries: action.payload,
            };
        case actionNames.CREATE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, createLibrary: false },
            };
        case actionNames.READ_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: true },
            };
        case actionNames.READ_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                libraries: action.payload,
            };
        case actionNames.READ_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
            };
        case actionNames.UPDATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: true },
            };
        case actionNames.UPDATE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: false },
                libraries: action.payload,
            };
        case actionNames.UPDATE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: false },
            };
        case actionNames.DELETE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: true },
            };
        case actionNames.DELETE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                libraries: action.payload,
            };
        case actionNames.DELETE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
            };

        default:
            return state;
    }
};

export default userReducer;
