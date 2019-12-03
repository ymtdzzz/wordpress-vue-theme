import axios from 'axios'
import CONSTANTS from '../Constants'
import router from "../router";

const baseURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_BASE_PATH

const http = axios.create({
    baseURL
})

http.interceptors.response.use((response) => { return response }, (error) => {
    if (error.response.status === 400) {
        router.replace('/error/404')
    }
})

export default http