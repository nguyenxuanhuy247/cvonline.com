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

export const createTechnology = (data) => {
    return axios.post('/post-technology', data);
};

export const readTechnology = (id, key, side, page, pageSize) => {
    return axios.get(`/get-technology?id=${id}&key=${key}&side=${side}&page=${page}&page_size=${pageSize}`);
};

export const updateTechnology = (data) => {
    return axios.put('/put-technology', data);
};

export const deleteTechnology = (id, key, side) => {
    return axios.delete(`/delete-technology?id=${id}&key=${key}&side=${side}`);
};

// =============================================================================
export const getAllUsersFromServer = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const deleteUser = (inputId) => {
    return axios.delete(`/api/delete-user?id=${inputId}`);
};
