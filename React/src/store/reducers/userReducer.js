import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        createLibrary: false,
        readLibrary: false,
        updateLibrary: false,
        createFramework: false,
        readFramework: false,
        updateFramework: false,
    },
    isSignUp: false,
    signUpMessage: {},
    isSignIn: false,
    signInMessage: {},
    errorCode: {
        createLibrary: undefined,
        readLibrary: undefined,
        updateLibrary: undefined,
        deleteLibrary: undefined,
    },
    readLibrary: {
        totalPages: 0,
        libraries: [],
    },
    readFramework: {
        frameworks: [],
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
                errorCode: {
                    ...state.errorCode,
                    createLibrary: undefined,
                },
            };
        case actionNames.CREATE_LIBRARY_SUCCESS:
        case actionNames.CREATE_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    createLibrary: false,
                },
                errorCode: {
                    ...state.errorCode,
                    createLibrary: action.payload.errorCode,
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
                errorCode: {
                    ...state.errorCode,
                    readLibrary: action.payload.errorCode,
                },
                readLibrary: {
                    totalPages: action.payload.totalPages,
                    libraries: action.payload.data,
                },
            };
        case actionNames.READ_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, readLibrary: false },
                errorCode: {
                    ...state.errorCode,
                    readLibrary: action.payload.errorCode,
                },
            };
        // UPDATE LIBRARY
        case actionNames.UPDATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: true },
                errorCode: {
                    ...state.errorCode,
                    updateLibrary: undefined,
                },
            };
        case actionNames.UPDATE_LIBRARY_SUCCESS:
        case actionNames.UPDATE_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateLibrary: false },
                errorCode: {
                    ...state.errorCode,
                    updateLibrary: action.payload.errorCode,
                },
            };
        // DELETE LIBRARY
        case actionNames.DELETE_LIBRARY_START:
            return {
                ...state,
                errorCode: {
                    ...state.errorCode,
                    deleteLibrary: undefined,
                },
            };
        case actionNames.DELETE_LIBRARY_SUCCESS:
        case actionNames.DELETE_LIBRARY_FAILURE:
            return {
                ...state,
                errorCode: {
                    ...state.errorCode,
                    deleteLibrary: action.payload.errorCode,
                },
            };
        // READ FRAMEWORK
        case actionNames.READ_FRAMEWORK_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, readFramework: true },
            };
        case actionNames.READ_FRAMEWORK_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, readFramework: false },
                errorCode: {
                    ...state.errorCode,
                    readLibrary: action.payload.errorCode,
                },
                readFramework: {
                    frameworks: action.payload.data,
                },
            };
        case actionNames.READ_FRAMEWORK_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, readFramework: false },
                errorCode: {
                    ...state.errorCode,
                    readLibrary: action.payload.errorCode,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
