import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:process.env.serverUrl,
    headers:{
        "Content-Type":'application/json'
    }
})
 
export default axiosInstance