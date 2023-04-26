import axios from "~/config/axios.js";

const handleLogin = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

export { handleLogin };
