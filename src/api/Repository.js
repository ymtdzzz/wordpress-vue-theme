import axios from 'axios'
import CONSTANTS from '../Constants'
import router from "../router";

const baseURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_BASE_PATH
const menuURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_MENU_PATH
const relatedURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_RELATED_PATH
const popularURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_POPULAR_PATH

const base_http = axios.create({
    baseURL
})

export const menu_http = axios.create({
	menuURL
})

export const related_http = axios.create({
    relatedURL
})

export const popular_http = axios.create({
    popularURL
})

base_http.interceptors.response.use((response) => { return response }, (error) => {
    if (error.response.status === 400) {
        router.replace('/error/404')
    }
})

export default base_http
