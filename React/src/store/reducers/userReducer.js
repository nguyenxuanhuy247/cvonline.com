import actionNames from '../actions/actionNames';

const initialState = {
    isSignIn: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isSignIn: true,
            }
        case actionNames.USER_SIGNIN_FAIL:
            return {
                ...state,
                isSignIn: false,
            }
        case actionNames.PROCESS_LOGOUT:
            return {
                ...state,
                isSignIn: false,
            }
        default:
            return state;
    }
}

export default appReducer;
