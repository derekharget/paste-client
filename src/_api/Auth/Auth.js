import axios from 'axios';
import AuthService from '../../_services/Auth/AuthService';



/* Handle register requests to the server */

const register_api = data => {
    return axios.post(process.env.REACT_APP_API_SERVER_URL + "/api/register", data).then((response) => {
        if (response.data.access_token) {
            AuthService.handle_login(response.data);
        }
        return response.data;
    });
};

/* Handle login requests to the server */

const login_api = (data) => {
    return axios
        .post(process.env.REACT_APP_API_SERVER_URL + "/api/login", data)
        .then((response) => {
            if (response.data.access_token) {
                AuthService.handle_login(response.data);
            }

            return response.data;
        });
};

const AuthAPI = {
    register_api,
    login_api
};

export default AuthAPI;
