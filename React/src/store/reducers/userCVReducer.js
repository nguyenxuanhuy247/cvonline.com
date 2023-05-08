import actionNames from '../actions/actionNames.js';

const initialState = {
    content: '',
};

const userCVReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.USER_CHANGE_JOB_TITLE:
            return {
                ...state,
                content: action.payload,
            };
        default:
            return state;
    }
};

export default userCVReducer;
