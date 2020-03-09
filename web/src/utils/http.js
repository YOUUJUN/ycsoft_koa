import axios from 'axios'

let $axios = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials :true
});

export default $axios;