import axios from '~/config/axios.js';

// =============================================================================
// HANDLE SIGNUP
export const postSignUp = (userData) => {
    return axios.post(`/api/signup`, userData);
};

// HANDLE SIGNIN
export const postSignIn = (userData) => {
    return axios.post(`/api/signin`, userData);
};

// HANDLE CHANGE PASSWORD
export const postForgotPassword = (data) => {
    return axios.post(`/api/forgot-password`, data);
};

// DELETE ACCOUNT
export const deleteAccount = (userId) => {
    return axios.delete(`/api/delete-account?userId=${userId}`);
};

// =============================================================================
// READ HOME LAYOUT

export const readSearch = (searchValue) => {
    return axios.get(`/api/search?searchValue=${searchValue}`);
};

// READ HOME LAYOUT
export const readHomeLayout = () => {
    return axios.get(`/api/get-home-layout`);
};

// READ CV LAYOUT
export const readCVLayout = (userId) => {
    return axios.get(`/api/get-cv-layout?userId=${userId}`);
};

// =============================================================================
// CRUD USER INFORMATION

export const updateUserInformation = (data) => {
    return axios.put('/api/put-user-information', data);
};

// =============================================================================
// CRUD PRODUCT

export const createProduct = (userId) => {
    return axios.post(`/api/post-product?userId=${userId}`);
};

export const updateProduct = (data) => {
    return axios.put(`/api/put-product`, data);
};

export const deleteProduct = (userId, productId) => {
    return axios.delete(`/api/delete-product?userId=${userId}&&productId=${productId}`);
};

export const moveProduct = (data) => {
    return axios.put(`/api/move-product`, data);
};

// =================================================================
// CRUD TECHNOLOGY

export const createTechnology = (data) => {
    return axios.post('/api/post-technology', data);
};

export const updateTechnology = (data) => {
    return axios.put('/api/put-technology', data);
};

export const dragAndDropTechology = (data) => {
    return axios.put('/api/drag-drop-technology', data);
};

export const deleteTechnology = (technologyData) => {
    const { technologyId, type, key, side, userId, productId, label } = technologyData;

    return axios.delete(
        `/api/delete-technology?technologyId=${technologyId}&&type=${type}&&key=${key}&&side=${side}&&userId=${userId}&&productId=${productId}&&label=${label}`,
    );
};

// =============================================================================
// HANDLE CHANGE USER ID

export const changeUserID = (data) => {
    return axios.post(`/api/change-userID`, data);
};

// =============================================================================
// HANDLE CHANGE PASSWORD

export const SendCVByEmail = (data) => {
    return axios.post(`/api/send-cv-by-email`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
