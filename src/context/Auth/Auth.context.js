import axios from 'axios';
import React from 'react';

const userAuthenticatedContext = React.createContext({
    isAuthenticated: false,
    token: '',
    login: (data) => {},
    register: (data) => {},
    logout: () => {}
});

// API URL
const API_URL = "http://127.0.0.1:8000/api/";

// Grab  JWT from localstorage
const retrieveStoredToken = () => {
    return JSON.parse(localStorage.getItem("user"));
}


export const AuthContextProvider = (props) => {


    const userIsLoggedIn = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
    };

    const loginHandler = (data) => {
        return axios
            .post(API_URL + "login", data)
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    };

    const registerHandler = data => {
        return axios.post(API_URL + "register", data).then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    };


    const contextValue = {
        token: retrieveStoredToken(),
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler
    };

    return (
        <userAuthenticatedContext.Provider value={contextValue}>
            {props.children}
        </userAuthenticatedContext.Provider>
    );
};

export default userAuthenticatedContext;
