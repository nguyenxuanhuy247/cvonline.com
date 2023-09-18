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
        sendCVByEmail: false,
    },
    isSignIn: false,
    isSignUp: false,
    isRedirectToSignIn: false,
    owner: null,
    allCVList: undefined,
    CVHistory: [],
    userInfo: null,
    shouldUpdateUserInfo: false,
    productList: undefined,
    searchResultList: [],
    shouldUpdateProductNameAndDesc: false,
    isCVSent: false,
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
                isRedirectToSignIn: false,
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
                isRedirectToSignIn: false,
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
                isRedirectToSignIn: false,
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
                isRedirectToSignIn: false,
                owner: null,
                CVHistory: [],
            };

        // SIGN OUT AND REDIRECT TO SIGN IN PAGE
        case actionNames.USER_SIGNOUT_REDIRECT_TO_SIGNIN:
            return {
                ...state,
                isSignIn: false,
                isSignUp: false,
                isRedirectToSignIn: true,
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
                isRedirectToSignIn: false,
                allCVList: action.payload,
            };
        case actionNames.READ_HOME_LAYOUT_FAILURE:
            return {
                ...state,
                isLoading: { ...state.isLoading, homeLayout: false },
                allCVList: [],
            };

        // READ CV LAYOUT
        case actionNames.READ_CV_LAYOUT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: true },
            };
        case actionNames.READ_CV_LAYOUT_SUCCESS:
            const userIDList = [...state.CVHistory];
            const userInfoData = action.payload.userInfo;
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
                isLoading: { ...state.isLoading, CVLayout: false },
                isRedirectToSignIn: false,
                ...action.payload,
                CVHistory: userIDList,
            };
        case actionNames.READ_CV_LAYOUT_FAILURE:
            const CVLayoutDataFromDB = action.payload;

            let CVLayoutProps;

            if (state.isSignIn && CVLayoutDataFromDB.errorCode === 10) {
                CVLayoutProps = { isSignIn: false, isSignUp: false };

                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3500);
            }

            let CVLayoutUserInfo;
            if (CVLayoutDataFromDB.errorCode === 32) {
                CVLayoutUserInfo = { userInfo: { id: 0 } };
            }

            let CVLayoutProductList;
            if (CVLayoutDataFromDB.errorCode === 33) {
                CVLayoutProductList = { userInfo: CVLayoutDataFromDB.data, productList: [] };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, CVLayout: false },
                ...CVLayoutUserInfo,
                ...CVLayoutProductList,
                ...CVLayoutProps,
            };

        // SEND CV BY EMAIL
        case actionNames.SEND_CV_BY_EMAIL_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, sendCVByEmail: true },
            };
        case actionNames.SEND_CV_BY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, sendCVByEmail: false },
                isCVSent: true,
            };
        case actionNames.SEND_CV_BY_EMAIL_FAILURE:
            const sendCVByEmailErrorCode = action.payload;
            let sendCVByEmailProps;

            if (sendCVByEmailErrorCode === 32) {
                sendCVByEmailProps = { isSignIn: false, isSignUp: false };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, sendCVByEmail: false },
                isCVSent: false,
                ...sendCVByEmailProps,
            };

        // =================================================================
        // CV LAYOUT

        // UPDATE USER INFORMATION
        case actionNames.UPDATE_USER_INFORMATION_START:
            const hasJobPosition = action.payload;
            let isCVLoading = false;
            if (hasJobPosition) {
                isCVLoading = true;
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: true, CVLayout: isCVLoading },
                shouldUpdateUserInfo: false,
            };
        case actionNames.UPDATE_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: false, CVLayout: false },
                owner: action.payload,
                userInfo: action.payload,
                shouldUpdateUserInfo: false,
            };
        case actionNames.UPDATE_USER_INFORMATION_FAILURE:
            const updateUserInformationErrorCode = action.payload;
            let updateUserInformationProps;

            if (updateUserInformationErrorCode === 10 || updateUserInformationErrorCode === 32) {
                updateUserInformationProps = { isSignIn: false, isSignUp: false };

                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, updateUserInformation: false, CVLayout: false },
                shouldUpdateUserInfo: true,
                ...updateUserInformationProps,
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
            const createProductErrorCode = action.payload;
            let createProductProps;

            if (createProductErrorCode === 10 || createProductErrorCode === 32) {
                createProductProps = { isSignIn: false, isSignUp: false };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, createProduct: false },
                ...createProductProps,
            };

        // UPDATE PRODUCT
        case actionNames.UPDATE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, updateProduct: true },
                shouldUpdateProductNameAndDesc: false,
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
                shouldUpdateProductNameAndDesc: false,
            };
        case actionNames.UPDATE_PRODUCT_FAILURE:
            const updateProductPayload = action.payload;
            let updateProductProps;
            let updateProductProductList = { productList: state.productList };

            if (updateProductPayload.errorCode === 10) {
                updateProductProps = { isSignIn: false, isSignUp: false };
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            }

            if (updateProductPayload.errorCode === 32) {
                updateProductProductList = { productList: updateProductPayload.data };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, updateProduct: false },
                ...updateProductProps,
                ...updateProductProductList,
                shouldUpdateProductNameAndDesc: true,
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
            const deleteProductPayload = action.payload;
            let deleteProductProps;
            let deleteProductProductList = { productList: state.productList };

            if (deleteProductPayload.errorCode === 10) {
                deleteProductProps = { isSignIn: false, isSignUp: false };
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            }

            if (deleteProductPayload.errorCode === 32) {
                deleteProductProductList = { productList: deleteProductPayload.data };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, deleteProduct: false },
                ...deleteProductProps,
                ...deleteProductProductList,
            };

        // MOVE PRODUCT
        case actionNames.MOVE_PRODUCT_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, moveProduct: true },
                shouldUpdateProductNameAndDesc: false,
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
                shouldUpdateProductNameAndDesc: true,
                productList: newProductList,
            };
        case actionNames.MOVE_PRODUCT_FAILURE:
            const moveProductPayload = action.payload;
            let moveProductProps;
            let moveProductProductList = { productList: state.productList };

            if (moveProductPayload.errorCode === 10) {
                moveProductProps = { isSignIn: false, isSignUp: false };
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            }

            if (moveProductPayload.errorCode === 32) {
                moveProductProductList = { productList: moveProductPayload.data };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, moveProduct: false },
                shouldUpdateProductNameAndDesc: false,
                ...moveProductProps,
                ...moveProductProductList,
            };

        // =================================================================
        // CRUD TECHONOLOGY
        case actionNames.CREATE_TECHNOLOGY_SUCCESS:
        case actionNames.UPDATE_TECHNOLOGY_SUCCESS:
        case actionNames.DELETE_TECHNOLOGY_SUCCESS:
        case actionNames.DRAG_DROP_TECHNOLOGY_SUCCESS:
            const { productIndex: productIndex_Success, dataFromDB: dataFromDB_Success } = action.payload;

            const selectedProduct = state.productList[productIndex_Success];
            const newProduct = { ...selectedProduct, ...dataFromDB_Success };

            const newProductList_CRUDTechnologySuccess = [...state.productList];
            newProductList_CRUDTechnologySuccess[productIndex_Success] = newProduct;

            return {
                ...state,
                productList: newProductList_CRUDTechnologySuccess,
            };

        case actionNames.CREATE_TECHNOLOGY_FAILURE:
        case actionNames.UPDATE_TECHNOLOGY_FAILURE:
        case actionNames.DELETE_TECHNOLOGY_FAILURE:
        case actionNames.DRAG_DROP_TECHNOLOGY_FAILURE:
            const { productIndex: productIndex_Failure, dataFromDB: dataFromDB_Failure } = action.payload;

            let technologyProps;
            if (dataFromDB_Failure.errorCode === 10) {
                technologyProps = { isSignIn: false, isSignUp: false };
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            }

            let newProductList_CRUDTechnologyFailure = [...state.productList];
            if (dataFromDB_Failure.errorCode === 32) {
                const selectedProduct = state.productList[productIndex_Failure];
                const newProduct = { ...selectedProduct, ...dataFromDB_Failure.data };

                newProductList_CRUDTechnologyFailure[productIndex_Failure] = newProduct;
            }

            return {
                ...state,
                ...technologyProps,
                productList: newProductList_CRUDTechnologyFailure,
            };

        // =================================================================
        // CHANGE USER ID
        case actionNames.CHANGE_ID_START:
            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: true },
            };

        case actionNames.CHANGE_ID_SUCCESS:
            const newOwner = { ...state.owner };
            newOwner.id = action.payload;

            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: false },
                owner: newOwner,
            };
        case actionNames.CHANGE_ID_FAILURE:
            const changeIDErrorCode = action.payload;

            let changeIDProps;
            if (changeIDErrorCode === 10 || changeIDErrorCode === 32) {
                changeIDProps = { isSignIn: false, isSignUp: false };
            }

            return {
                ...state,
                isLoading: { ...state.isLoading, changeUserID: false },
                ...changeIDProps,
            };

        default:
            return state;
    }
};

export default userReducer;
