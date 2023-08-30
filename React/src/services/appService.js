import axios from '~/config/axios.js';

// =============================================================================

export const verifyUserEmail = (userEmail) => {
    return axios.get(`/api/verify-user-email?userEmail=${userEmail}`);
};

export const verifyUserID = (userId) => {
    return axios.get(`/api/verify-userID?userId=${userId}`);
};

export const verifyCurrentPassword = (data) => {
    return axios.post(`/api/verify-current-password`, data);
};
