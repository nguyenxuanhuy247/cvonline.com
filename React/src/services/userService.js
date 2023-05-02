import axios from "~/config/axios.js";

// Handle Sign In
export const handleSignIn = (userEmail, userPassword) => {
    return axios.post("/api/signin", {
        email: userEmail,
        password: userPassword,
    });
};

// Handle Sign Up
export const handleSignUp = (userData) => {
    return axios.post("/api/signup", {
        email: userData.email,
        password: userData.password,
    });
};

export const getAllUsersFromServer = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const deleteUser = (inputId) => {
    return axios.delete(`/api/delete-user?id=${inputId}`);
};


