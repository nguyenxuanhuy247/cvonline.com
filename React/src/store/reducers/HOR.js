import actionNames from '../actions/actionNames.js';

export const contenteditableReducer = (prefix, reducer) => {
    const UPPER_TEXT = prefix
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toUpperCase()
        .split(' ')
        .join('_');
    console.log(UPPER_TEXT);
    return (state, action) => {
        switch (action.type) {
            case actionNames[`USER_CHANGE_${UPPER_TEXT}`]:
                return {
                    ...state,
                    prefix: action.payload,
                };
            default:
                return state;
        }
    };
};
