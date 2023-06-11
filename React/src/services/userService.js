import axios from '~/config/axios.js';

// =============================================================================
// HANDLE SIGNUP
export const postSignUp = (userData) => {
    return axios.post(`/signup`, {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
    });
};

// HANDLE SIGNIN
export const postSignIn = (userEmail, userPassword) => {
    return axios.post(`/signin`, {
        email: userEmail,
        password: userPassword,
    });
};

// =============================================================================
// CRUD LIBRARY

export const createLibrary = (data) => {
    return axios.post('/post-technology', data);
};

export const readLibrary = (key, side, id, page, pageSize) => {
    return axios.get(`/get-technology?key=${key}&side=${side}&id=${id}&page=${page}&page_size=${pageSize}`);
};

export const updateLibrary = (data) => {
    return axios.put('/put-technology', data);
};

export const deleteLibrary = (key, side, id) => {
    return axios.delete(`/delete-technology?key=${key}&side=${side}&id=${id}`);
};

// =============================================================================
export const getAllUsersFromServer = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const deleteUser = (inputId) => {
    return axios.delete(`/api/delete-user?id=${inputId}`);
};
