import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        signin: false,
        signup: false,
        CVLayout: false,
    },
    isSignIn: false,
    isSignUp: false,
    userInfo: null,
    productList: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER CHANGE PASSWORD
        case actionNames.USER_CHANGE_PASSWORD_START:
            return {
                ...state,
            };
        case actionNames.USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                user: { ...state.user, isPasword: true },
            };
        case actionNames.USER_CHANGE_PASSWORD_FAIL:
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
                userInfo: action.payload,
            };
        case 'USER_SIGNIN_FAIL':
            return {
                ...state,
                isLoading: { ...state.isLoading, signin: false },
            };

        // USER SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
            };

        // =================================================================
        // READ USER INFORMATION
        case actionNames.READ_USER_INFORMATION_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.READ_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                userInfo: action.payload,
            };
        case actionNames.READ_USER_INFORMATION_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // =================================================================
        // CREATE PRODUCT
        case actionNames.CREATE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.CREATE_PRODUCT_SUCCESS:
            const data = action.payload;
            const created_productList = [...state.productList];
            created_productList.push(data);

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: created_productList,
            };
        case actionNames.CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // READ PRODUCT
        case actionNames.READ_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.READ_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: action.payload,
            };
        case actionNames.READ_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: [],
            };

        // UPDATE PRODUCT
        case actionNames.UPDATE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.UPDATE_PRODUCT_SUCCESS:
            const { productData, index: updated_index, updatedItem } = action.payload;
            const updated_product = state.productList[updated_index];
            const updated_productInfo = updated_product.productInfo;

            updated_productInfo[updatedItem] = productData[updatedItem];
            updated_product.productInfo = updated_productInfo;

            const newUpdated_productList = [...state.productList];
            newUpdated_productList[updated_index] = updated_product;

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: newUpdated_productList,
            };
        case actionNames.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // DELETE PRODUCT
        case actionNames.DELETE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.DELETE_PRODUCT_SUCCESS:
            const index = action.payload;
            const deleted_productList = [...state.productList];
            deleted_productList.splice(index, 1);

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: deleted_productList,
            };
        case actionNames.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // MOVE PRODUCT
        case actionNames.MOVE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.MOVE_PRODUCT_SUCCESS:
            const { movedItemIndex, siblingItemIndex } = action.payload;
            const newProductList = [...state.productList];

            const movedProductInfo = newProductList[movedItemIndex];
            const siblingProductInfo = newProductList[siblingItemIndex];

            newProductList[movedItemIndex] = siblingProductInfo;
            newProductList[siblingItemIndex] = movedProductInfo;

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                productList: newProductList,
            };
        case actionNames.MOVE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
            };

        // =================================================================
        // CREATE TECHONOLOGY
        case actionNames.CREATE_TECHNOLOGY_START:
            return {
                ...state,
            };
        case actionNames.CREATE_TECHNOLOGY_SUCCESS:
            const { index: created_index, data: created_dataFromDB } = action.payload;

            const created_changedProduct = state.productList[created_index];
            const created_newProduct = { ...created_changedProduct, ...created_dataFromDB };
            const created_newProductList = [...state.productList];

            created_newProductList[created_index] = created_newProduct;

            return {
                ...state,
                productList: created_newProductList,
            };
        case actionNames.CREATE_TECHNOLOGY_FAILURE:
            return {
                ...state,
            };

        // DELETE TECHONOLOGY
        case actionNames.DELETE_TECHNOLOGY_START:
            return {
                ...state,
            };
        case actionNames.DELETE_TECHNOLOGY_SUCCESS:
            const { index: deleted_index, data: deleted_dataFromDB } = action.payload;

            const deleted_changedProduct = state.productList[deleted_index];
            const deleted_newProduct = { ...deleted_changedProduct, ...deleted_dataFromDB };
            const deleted_newProductList = [...state.productList];

            deleted_newProductList[deleted_index] = deleted_newProduct;

            return {
                ...state,
                productList: deleted_newProductList,
            };
        case actionNames.DELETE_TECHNOLOGY_FAILURE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
