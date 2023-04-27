import axios from "~/config/axios.js";

export const handleLogin = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};


export const getAllUsersFromServer = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};


