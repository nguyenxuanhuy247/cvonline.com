import axios from '~/config/axios.js';

// =============================================================================

export const verifyUserID = (userId) => {
    return axios.get(`/api/verify-userID?userId=${userId}`);
};

export const verifyUserEmail = (userEmail) => {
    return axios.get(`/api/verify-user-email?userEmail=${userEmail}`);
};
