import actionNames from '../actions/actionNames';

const initialState = {
    isLoading: {
        authLayout: false,
        forgotPassword: false,
        deleteAccount: false,
        homeLayout: false,
        CVLayout: false,
        updateUserInformation: false,
        createProduct: false,
        updateProduct: false,
        deleteProduct: false,
        moveProduct: false,
        changeUserID: false,
        search: false,
    },
    isSignIn: false,
    isSignUp: false,
    owner: null,
    allCVList: undefined,
    CVHistory: [],
    userInfo: null,
    productList: undefined,
    searchResultList: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // AUTH LAYOUT

        // SIGN IN
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
        case actionNames.USER_SIGNIN_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
            };

        // SIGN UP
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
        case actionNames.USER_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, authLayout: false },
            };

        // DELETE ACCOUNT
        case actionNames.DELETE_ACCOUNT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, deleteAccount: true },
            };
        case actionNames.DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, deleteAccount: false },
                isSignIn: false,
                isSignUp: false,
                owner: null,
            };
        case actionNames.DELETE_ACCOUNT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, deleteAccount: false },
            };

        // FORGOT PASSWORD
        case actionNames.USER_FORGOT_PASSWORD_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, forgotPassword: true },
            };
        case actionNames.USER_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, forgotPassword: false },
            };
        case actionNames.USER_FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, forgotPassword: false },
            };

        // SIGN OUT
        case actionNames.USER_SIGNOUT:
            return {
                ...state,
                isSignIn: false,
                isSignUp: false,
                owner: null,
                CVHistory: [],
            };

        // =================================================================
        // SEARCH VALUE
        case actionNames.READ_SEARCH_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, search: true },
            };
        case actionNames.READ_SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, search: false },
                searchResultList: action.payload,
            };
        case actionNames.READ_SEARCH_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, search: false },
                searchResultList: [],
            };
        case actionNames.CLEAR_SEARCH_RESULT:
            return {
                ...state,
                searchResultList: [],
            };

        // HOME LAYOUT
        // READ HOME LAYOUT
        case actionNames.READ_HOME_LAYOUT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, homeLayout: true },
            };
        case actionNames.READ_HOME_LAYOUT_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, homeLayout: false },
                allCVList: action.payload,
            };
        case actionNames.READ_HOME_LAYOUT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, homeLayout: false },
                allCVList: [],
            };

        // =================================================================
        // CV LAYOUT
        // READ USER INFORMATION
        case actionNames.READ_USER_INFORMATION_SUCCESS:
            const userIDList = [...state.CVHistory];
            const userInfoData = action.payload;
            const userID = userInfoData.id;
            const lastUserIDInList = userIDList[userIDList.length - 1];

            if (state.isSignIn) {
                if (userID !== state.owner?.id && userID !== lastUserIDInList) {
                    userIDList.push(userID);
                }
            } else if (userID !== lastUserIDInList) {
                userIDList.push(userID);
            }

            return {
                ...state,
                userInfo: action.payload,
                CVHistory: userIDList,
            };
        case actionNames.READ_USER_INFORMATION_FAILURE:
            return {
                ...state,
                userInfo: { id: 0 },
            };

        // UPDATE USER INFORMATION
        case actionNames.UPDATE_USER_INFORMATION_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: true },
            };
        case actionNames.UPDATE_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: false },
                owner: action.payload,
                userInfo: action.payload,
            };
        case actionNames.UPDATE_USER_INFORMATION_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: false },
            };

        // UPDATE CV HISTORY
        case actionNames.REMOVE_CV_FROM_HISTORY:
            const copy_CVHistory = [...state.CVHistory];
            copy_CVHistory.shift();

            return {
                ...state,
                CVHistory: copy_CVHistory,
            };

        // =================================================================
        // CREATE PRODUCT
        case actionNames.CREATE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, createProduct: true },
            };
        case actionNames.CREATE_PRODUCT_SUCCESS:
            const data = action.payload;
            const created_productList = [...state.productList];
            created_productList.push(data);

            return {
                ...state,
                isLoading: { ...state.isLoading, createProduct: false },
                productList: created_productList,
            };
        case actionNames.CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, createProduct: false },
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
                isLoading: { ...state.isLoading, updateProduct: true },
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
                isLoading: { ...state.isLoading, updateProduct: false },
                productList: newUpdated_productList,
            };
        case actionNames.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateProduct: false },
            };

        // DELETE PRODUCT
        case actionNames.DELETE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, deleteProduct: true },
            };
        case actionNames.DELETE_PRODUCT_SUCCESS:
            const index = action.payload;
            const deleted_productList = [...state.productList];
            deleted_productList.splice(index, 1);

            return {
                ...state,
                isLoading: { ...state.isLoading, deleteProduct: false },
                productList: deleted_productList,
            };
        case actionNames.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, deleteProduct: false },
            };

        // MOVE PRODUCT
        case actionNames.MOVE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, moveProduct: true },
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
                isLoading: { ...state.isLoading, moveProduct: false },
                productList: newProductList,
            };
        case actionNames.MOVE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, moveProduct: false },
            };

        // =================================================================
        // CRUD TECHONOLOGY
        case actionNames.CREATE_TECHNOLOGY_SUCCESS:
        case actionNames.UPDATE_TECHNOLOGY_SUCCESS:
        case actionNames.DELETE_TECHNOLOGY_SUCCESS:
        case actionNames.DRAG_DROP_TECHNOLOGY_SUCCESS:
            const { productIndex, dataFromDB } = action.payload;

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
        case actionNames.DRAG_DROP_TECHNOLOGY_FAILURE:
            return {
                ...state,
            };

        // =================================================================
        // CHANGE USER ID
        case actionNames.CHANGE_ID_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: true },
            };

        case actionNames.CHANGE_ID_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: false },
                owner: action.payload,
            };
        case actionNames.CHANGE_ID_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: false },
            };

        default:
            return state;
    }
};

export default userReducer;
