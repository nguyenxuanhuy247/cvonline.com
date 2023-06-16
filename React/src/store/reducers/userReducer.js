import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        library: false,
        framework: false,
        sourcecode: false,
        programminglanguage: false,
    },
    isSignUp: false,
    signUpMessage: {},
    isSignIn: false,
    signInMessage: {},
    libraries: [],
    pageQuantityLibrary: 0,
    frameworks: [],
    sourceCodes: [],
    programmingLanguages: [],
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

        // CREATE LIBRARY
        case actionNames.CREATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: true },
            };
        case actionNames.CREATE_LIBRARY_SUCCESS:
        case actionNames.CREATE_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: false },
            };
        // READ LIBRARY
        case actionNames.READ_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: true },
            };
        case actionNames.READ_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: false },
                libraries: action.payload.data,
                pageQuantityLibrary: action.payload.totalPages,
            };
        case actionNames.READ_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: false },
            };
        // UPDATE LIBRARY
        case actionNames.UPDATE_LIBRARY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: true },
            };
        case actionNames.UPDATE_LIBRARY_SUCCESS:
        case actionNames.UPDATE_LIBRARY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, library: false },
            };

        // ================================================================

        // CREATE PROGRAMMING LANGUAGE
        case actionNames.CREATE_PROGRAMMINGLANGUAGE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: true },
            };
        case actionNames.CREATE_PROGRAMMINGLANGUAGE_SUCCESS:
        case actionNames.CREATE_PROGRAMMINGLANGUAGE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: false },
            };
        // READ PROGRAMMING LANGUAGE
        case actionNames.READ_PROGRAMMINGLANGUAGE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: true },
            };
        case actionNames.READ_PROGRAMMINGLANGUAGE_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: false },
                programmingLanguages: action.payload.data,
            };
        case actionNames.READ_PROGRAMMINGLANGUAGE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: false },
            };
        // UPDATE PROGRAMMING LANGUAGE
        case actionNames.UPDATE_PROGRAMMINGLANGUAGE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: true },
            };
        case actionNames.UPDATE_PROGRAMMINGLANGUAGE_SUCCESS:
        case actionNames.UPDATE_PROGRAMMINGLANGUAGE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, programminglanguage: false },
            };

        // ================================================================

        // CREATE SOURCE CODE
        case actionNames.CREATE_SOURCECODE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: true },
            };
        case actionNames.CREATE_SOURCECODE_SUCCESS:
        case actionNames.CREATE_SOURCECODE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: false },
            };
        // READ SOURCE CODE
        case actionNames.READ_SOURCECODE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: true },
            };
        case actionNames.READ_SOURCECODE_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: false },
                sourcecodes: action.payload.data,
            };
        case actionNames.READ_SOURCECODE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: false },
            };
        // UPDATE SOURCE CODE
        case actionNames.UPDATE_SOURCECODE_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: true },
            };
        case actionNames.UPDATE_SOURCECODE_SUCCESS:
        case actionNames.UPDATE_SOURCECODE_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, sourcecode: false },
            };
        // ================================================================

        // CREATE FRAMEWORK
        case actionNames.CREATE_FRAMEWORK_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: true },
            };
        case actionNames.CREATE_FRAMEWORK_SUCCESS:
        case actionNames.CREATE_FRAMEWORK_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: false },
            };
        // READ FRAMEWORK
        case actionNames.READ_FRAMEWORK_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: true },
            };
        case actionNames.READ_FRAMEWORK_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: false },
                frameworks: action.payload.data,
            };
        case actionNames.READ_FRAMEWORK_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: false },
            };
        // UPDATE FRAMEWORK
        case actionNames.UPDATE_FRAMEWORK_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: true },
            };
        case actionNames.UPDATE_FRAMEWORK_SUCCESS:
        case actionNames.UPDATE_FRAMEWORK_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, framework: false },
            };
        default:
            return state;
    }
};

export default userReducer;
