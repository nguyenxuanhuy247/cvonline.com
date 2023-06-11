import { deleteLibrary } from '~/services';
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
    createLibrary: {
        errorCode: undefined,
        errorMessage: '',
    },
    readLibrary: {
        errorCode: undefined,
        errorMessage: '',
        totalPages: 0,
        libraries: [],
    },
    updateLibrary: {
        errorCode: undefined,
        errorMessage: '',
    },
    deleteLibrary: {
        errorCode: undefined,
        errorMessage: '',
    },
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
        // CREATE LIBRARY
        case actionNames.CREATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, createLibrary: true },
            };
        case actionNames.CREATE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    createLibrary: false,
                },
                createLibrary: {
                    ...state.createLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
                readLibrary: {
                    totalPages: action.payload.totalPages,
                },
            };

        case actionNames.CREATE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    createLibrary: false,
                },
                createLibrary: {
                    ...state.createLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };
        // READ LIBRARY
        case actionNames.READ_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: true },
            };
        case actionNames.READ_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                readLibrary: {
                    ...state.readLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                    totalPages: action.payload.totalPages,
                    libraries: action.payload.data,
                },
            };
        case actionNames.READ_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                readLibrary: {
                    ...state.readLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };
        // UPDATE LIBRARY
        case actionNames.UPDATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: true },
            };
        case actionNames.UPDATE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: false },
                updateLibrary: {
                    ...state.updateLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };
        case actionNames.UPDATE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: false },
                updateLibrary: {
                    ...state.updateLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };
        // DELETE LIBRARY
        case actionNames.DELETE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: true },
            };
        case actionNames.DELETE_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                deleteLibrary: {
                    ...state.deleteLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };
        case actionNames.DELETE_LIBRARY_FAILED:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                deleteLibrary: {
                    ...state.deleteLibrary,
                    errorCode: action.payload.errorCode,
                    errorMessage: action.payload.errorMessage,
                },
            };

        default:
            return state;
    }
};

export default userReducer;
