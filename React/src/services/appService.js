import axios from '~/config/axios.js';

// =============================================================================

export const verifyUserID = (userId) => {
    return axios.get(`/api/verify-userID?userId=${userId}`);
};
