import axios from 'axios';


// const Login = async (data) => {
//     const payload = await axios.post('http://127.0.0.1:8000/api/login', data);
//
//     payload.then((response) => {
//
//     })
//
//     return response.data;
// };


const API_URL = "http://127.0.0.1:8000/api/";

const register = data => {
    return axios.post(API_URL + "register", data).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });;
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

export default {
    register,
    login,
    logout,
    getCurrentUser,
};