import axios from "axios";
import AuthService from "../../_services/Auth/AuthService";


// Return 10 latest posts for the sidebar

const getLatestPosts = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/latest`);
    return data.data;
}


/* Get paste from API  */

const getPaste = async (pasteSlug) => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/paste/${pasteSlug}`);
    return data.data;
}


const getLoggedInUsersPaste = async () => {
    const userToken = AuthService.handle_getCurrentUser();
    const {data} = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/getUsersPastes`,
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken.access_token}`
                }
        });
    return data.data;

}


const deletePaste = async (pasteSlug) => {
    const userToken = AuthService.handle_getCurrentUser();
    return axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/api/paste/${pasteSlug}`, {
        headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken.access_token}`
            }
    });
};


const newPaste = async (data) => {
    const userToken = AuthService.handle_getCurrentUser();

    return await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/paste`, data, { headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken.access_token}`
            }}).then((response) => {
        return response.data;
    });
};


const updatePaste = async (id, data) => {
    const userToken = AuthService.handle_getCurrentUser();
    return await axios.patch(`${process.env.REACT_APP_API_SERVER_URL}/api/paste/${id}`, data, {
        headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken.access_token}`
            }
    }).then((response) => {
        return response.data;
    });
};






const PasteAPI = {
    getLatestPosts,
    getPaste,
    getLoggedInUsersPaste,
    deletePaste,
    newPaste,
    updatePaste
};

export default PasteAPI;
