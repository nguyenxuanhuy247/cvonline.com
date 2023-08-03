import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        authLayout: false,
        CVLayout: false,
    },
    owner: null,
    isSignIn: false,
    isSignUp: false,
    userInfo: null,
    productList: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // AUTH LAYOUT
        // USER CHANGE PASSWORD
        case actionNames.USER_CHANGE_PASSWORD_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: true },
            };
        case actionNames.USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
                user: { ...state.user, isPasword: true },
            };
        case actionNames.USER_CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
            };

        // USER SIGN UP
        case actionNames.USER_SIGNUP_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: true },
            };
        case actionNames.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
                isSignUp: true,
            };
        case actionNames.USER_SIGNUP_FAIL:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
            };

        // USER SIGN IN
        case actionNames.USER_SIGNIN_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: true },
            };
        case actionNames.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
                isSignUp: true,
                isSignIn: true,
                owner: action.payload,
            };
        case actionNames.USER_SIGNIN_FAIL:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
            };

        // USER SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
            };

        // =================================================================
        // CV LAYOUT
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
                userInfo: action.payload,
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
        // CRUD TECHONOLOGY
        case actionNames.CREATE_TECHNOLOGY_SUCCESS:
        case actionNames.UPDATE_TECHNOLOGY_SUCCESS:
        case actionNames.DELETE_TECHNOLOGY_SUCCESS:
            const { index: productIndex, data: dataFromDB } = action.payload;

            const selectedProduct = state.productList[productIndex];
            const newProduct = { ...selectedProduct, ...dataFromDB };

            const CRUDTechnology_newProductList = [...state.productList];
            CRUDTechnology_newProductList[productIndex] = newProduct;

            return {
                ...state,
                productList: CRUDTechnology_newProductList,
            };

        case actionNames.CREATE_TECHNOLOGY_FAILURE:
        case actionNames.UPDATE_TECHNOLOGY_FAILURE:
        case actionNames.DELETE_TECHNOLOGY_FAILURE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
