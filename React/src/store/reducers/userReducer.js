const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        CVLayout: false,
    },
    isSignIn: false,
    isSignUp: false,
    user: null,
    productList: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER CHANGE PASSWORD
        case 'USER_CHANGE_PASSWORD_START':
            return {
                ...state,
            };
        case 'USER_CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                user: { ...state.user, isPasword: true },
            };
        case 'USER_CHANGE_PASSWORD_FAIL':
            return {
                ...state,
            };

        // USER SIGN UP
        case 'USER_SIGNUP_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: true },
            };
        case 'USER_SIGNUP_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
                isSignUp: true,
            };
        case 'USER_SIGNUP_FAIL':
            return {
                ...state,
                isLoading: { ...state.isLoading, signup: false },
            };

        // USER SIGN IN
        case 'USER_SIGNIN_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: true },
            };
        case 'USER_SIGNIN_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
                isSignIn: true,
                user: action.payload,
            };
        case 'USER_SIGNIN_FAIL':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
            };

        // USER SIGN OUT
        case 'USER_SIGNOUT':
            return {
                ...state,
                isSignIn: false,
            };

        // =================================================================
        // READ USER INFORMATION
        case 'READ_USER_INFORMATION_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'READ_USER_INFORMATION_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                user: action.payload,
            };
        case 'READ_USER_INFORMATION_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // =================================================================
        // CREATE PRODUCT
        case 'CREATE_PRODUCT_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'CREATE_PRODUCT_SUCCESS':
            const data = action.payload;
            const newProduct = { id: data.id, name: '', desc: '', productOrder: data.productOrder };
            const newProductInfoListArray = [...state.productInfoList];
            newProductInfoListArray.push(newProduct);

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productInfoList: newProductInfoListArray,
            };
        case 'CREATE_PRODUCT_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // READ PRODUCT LIST
        case 'READ_PRODUCT_LIST_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'READ_PRODUCT_LIST_SUCCESS':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: action.payload,
            };
        case 'READ_PRODUCT_LIST_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // UPDATE PRODUCT LIST
        case 'UPDATE_PRODUCT_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'UPDATE_PRODUCT_SUCCESS':
            const { productData, index, updatedItem } = action.payload;
            const updatedProductInfo = state.productInfoList[index];
            updatedProductInfo[updatedItem] = productData[updatedItem];

            const newUpdatedProductInfoList = [...state.productInfoList];
            newUpdatedProductInfoList[index] = updatedProductInfo;

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productInfoList: newUpdatedProductInfoList,
            };
        case 'UPDATE_PRODUCT_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // DELETE PRODUCT
        case 'DELETE_PRODUCT_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'DELETE_PRODUCT_SUCCESS':
            const deleted_ProductInfoList = state.productInfoList.filter((productInfo) => {
                return productInfo.id !== action.payload;
            });

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productInfoList: deleted_ProductInfoList,
            };
        case 'DELETE_PRODUCT_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // MOVE PRODUCT
        case 'MOVE_PRODUCT_START':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case 'MOVE_PRODUCT_SUCCESS':
            const newProductInfoList = [...state.productInfoList];
            const { movedItemIndex, siblingItemIndex } = action.payload;

            const movedProductInfo = newProductInfoList[movedItemIndex];
            const siblingProductInfo = newProductInfoList[siblingItemIndex];

            newProductInfoList[movedItemIndex] = siblingProductInfo;
            newProductInfoList[siblingItemIndex] = movedProductInfo;

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productInfoList: newProductInfoList,
            };
        case 'MOVE_PRODUCT_FAILURE':
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // =================================================================
        // CREATE TECHONOLOGY
        case 'CREATE_TECHNOLOGY_START':
            return {
                ...state,
            };
        case 'CREATE_TECHNOLOGY_SUCCESS':
            const { index: createdIndex, dataFromDB } = action.payload;

            const selectedTechnologyList = state.technologyList[createdIndex];

            const newTechnologyList = { ...selectedTechnologyList, ...dataFromDB };
            const copyState = { ...state };
            copyState.technologyList[createdIndex] = newTechnologyList;

            return {
                ...copyState,
            };
        case 'CREATE_TECHNOLOGY_FAILURE':
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
