import axios from 'axios'
import CONSTANTS from '../Constants'
import router from "../router";

const baseURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_BASE_PATH
const menuURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_MENU_PATH

const base_http = axios.create({
    baseURL
})

export const menu_http = axios.create({
	menuURL
})

base_http.interceptors.response.use((response) => { return response }, (error) => {
    if (error.response.status === 400) {
        router.replace('/error/404')
    }
})

export default base_http
