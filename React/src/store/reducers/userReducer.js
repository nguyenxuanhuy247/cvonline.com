import actionNames from '../actions/actionNames';
import _ from 'lodash';

const initialState = {
    isLoading: {
        forgotPassword: false,
        authLayout: false,
        CVLayout: false,
        homeLayout: false,
        changeUserID: false,
    },
    isSignIn: false,
    isSignUp: false,
    owner: null,
    allCVList: undefined,
    prevUserID: undefined,
    userInfo: null,
    productList: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // AUTH LAYOUT
        // USER FORGOT PASSWORD
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
        case actionNames.USER_SIGNUP_FAILURE:
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
        case actionNames.USER_SIGNIN_FAILURE:
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
            let prevUserID;
            const oldUserInfo = state.userInfo;
            const newUserInfo = action.payload;
            const isTheSame = _.isEqual(oldUserInfo, newUserInfo);

            if (oldUserInfo && !isTheSame) {
                prevUserID = oldUserInfo.id;
            } else {
                prevUserID = state.prevUserID;
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                prevUserID: prevUserID,
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

        // =================================================================
        // CHANGE USER ID
        case actionNames.CHANGE_ID_START:
            return {
                isLoading: { ...state.isLoading, changeUserID: true },
                ...state,
            };

        case actionNames.CHANGE_ID_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: false },
                owner: action.payload,
            };
        case actionNames.CHANGE_ID_FAILURE:
            return {
                isLoading: { ...state.isLoading, changeUserID: false },
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
