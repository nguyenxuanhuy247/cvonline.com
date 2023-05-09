import actionNames from '../actions/actionNames.js';

const initialState = {
    imageUrl: '',
};

const userCVReducer = (state = initialState, action) => {
    // const myDeepCopy = structuredClone(state);

    console.log(action);
    switch (action.type) {
        case actionNames.USER_CHANGE_PRODUCT_IMAGE:
            return {
                ...state,
                content: action.payload,
            };
        default:
            return state;
    }
};

export default userCVReducer;
