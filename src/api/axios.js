import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.serverUrl,
    headers:{
        "Content-Type":'application/json'
    }
})
 
export default axiosInstance