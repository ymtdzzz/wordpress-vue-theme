import axios from 'axios'
import CONSTANTS from '../Constants'

const baseURL = CONSTANTS.DEV_DOMAIN + CONSTANTS.API_BASE_PATH

export default axios.create({
    baseURL
})
