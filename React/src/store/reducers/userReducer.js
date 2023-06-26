import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        user: false,
        productList: false,

        library: false,
        sourcecode: false,
        BETechnology: false,
        FETechnology: false,
    },
    isSignUp: false,
    isSignIn: false,
    user: null,
    productList: [],

    libraries: [],
    pageQuantityLibrary: 0,
    BETechnologies: [],
    sourceCodes: [],
    FETechnologies: [],
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

        // =================================================================
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

        // CREATE FRONTEND ECHNOLOGY
        case actionNames.CREATE_FRONTEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: true },
            };
        case actionNames.CREATE_FRONTEND_TECHNOLOGY_SUCCESS:
        case actionNames.CREATE_FRONTEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: false },
            };
        // READ FRONTEND ECHNOLOGY
        case actionNames.READ_FRONTEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: true },
            };
        case actionNames.READ_FRONTEND_TECHNOLOGY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: false },
                FETechnologies: action.payload.data,
            };
        case actionNames.READ_FRONTEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: false },
            };
        // UPDATE FRONTEND ECHNOLOGY
        case actionNames.UPDATE_FRONTEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: true },
            };
        case actionNames.UPDATE_FRONTEND_TECHNOLOGY_SUCCESS:
        case actionNames.UPDATE_FRONTEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, FETechnology: false },
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

        // CREATE BACKEND TECHNOLOGY
        case actionNames.CREATE_BACKEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: true },
            };
        case actionNames.CREATE_BACKEND_TECHNOLOGY_SUCCESS:
        case actionNames.CREATE_BACKEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: false },
            };
        // READ BACKEND TECHNOLOGY
        case actionNames.READ_BACKEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: true },
            };
        case actionNames.READ_BACKEND_TECHNOLOGY_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: false },
                BETechnologies: action.payload.data,
            };
        case actionNames.READ_BACKEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: false },
            };
        // UPDATE BACKEND TECHNOLOGY
        case actionNames.UPDATE_BACKEND_TECHNOLOGY_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: true },
            };
        case actionNames.UPDATE_BACKEND_TECHNOLOGY_SUCCESS:
        case actionNames.UPDATE_BACKEND_TECHNOLOGY_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, BETechnology: false },
            };
        default:
            return state;
    }
};

export default userReducer;
