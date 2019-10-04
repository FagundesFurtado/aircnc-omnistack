import axios from 'axios';

import { serverURL } from '../config/server'


const api = axios.create({
    baseURL: serverURL,

})

export default api;