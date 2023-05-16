import actionNames from '../actions/actionNames.js';

export const contenteditableReducer = (specifiedName) => {

    const initialState = {
        [specifiedName]: '',
    };

    const UPPER_TEXT = specifiedName
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toUpperCase()
        .split(' ')
        .join('_');

    return (state = initialState, action) => {
        switch (action.type) {
            case actionNames[`USER_CHANGE_${UPPER_TEXT}`]:
                return {
                    ...state,
                    [specifiedName]: action.payload,
                };
            default:
                return state;
        }
    };
};
