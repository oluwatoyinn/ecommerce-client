import { axiosClient } from "./Config";

const setAuthenticatedToken = token => {
if (token) {
        axiosClient.defaults.headers.common['Authorization'] =`Bearer ${token}`;
    } else {
        delete axiosClient.defaults.headers.common['Authorization'];
    }
};

export default setAuthenticatedToken;