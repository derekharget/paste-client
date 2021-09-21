import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

const register = data => {
    return axios.post(API_URL + "register", data).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const login = (data) => {
    return axios
        .post(API_URL + "login", data)
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
