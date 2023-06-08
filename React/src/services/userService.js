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
export const getLibrary = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const createLibrary = (data) => {
    return axios.post('/post-technology', data);
};

export const editLibrary = (data) => {
    return axios.put('/api/edit-user', data);
};

export const deleteLibrary = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId },
    });
};

// =============================================================================
export const getAllUsersFromServer = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const deleteUser = (inputId) => {
    return axios.delete(`/api/delete-user?id=${inputId}`);
};
