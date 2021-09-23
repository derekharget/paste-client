

const handle_login = (token) => {
    localStorage.setItem("user", JSON.stringify(token));
}

const handle_logout = () => {
    localStorage.removeItem("user");
};

const handle_getCurrentUser = () => {
    // return false instead of undefined to fix crash when signing out
    if(!localStorage.getItem("user")){
        return false;
    }
    return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
    handle_login,
    handle_logout,
    handle_getCurrentUser,
};

export default AuthService;
