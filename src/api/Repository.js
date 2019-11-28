import axios from 'axios'
import { API_BASE_PATH, DEV_DOMAIN } from '../Constants'

const baseURL = DEV_DOMAIN + API_BASE_PATH

export default axios.create({
    baseURL
})
