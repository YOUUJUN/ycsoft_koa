import axios from 'axios';

// let $axios = axios.create({
//     baseURL : "http://localhost:3000",
//     withCredentials :true
// });



let myDIYAxios = function(options){

    console.log("well, i think i can do something here");
    const DevBaseUrl = 'http://127.0.0.1:3000';
    const ProdBashUrl = 'http://106.13.63.236';

    let baseURL = process.env.NODE_ENV !== 'production' ? DevBaseUrl : ProdBashUrl;
    let $axios = axios.create({
        baseURL : baseURL,
        withCredentials :true
    });

    $axios.interceptors.request.use(function (config) {
        let marscript = window.localStorage.getItem("marscript");
        if (marscript) {
            config.headers.accessToken = marscript;
            // config.headers['accessToken'] = Token;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    return $axios(options);
}

export default myDIYAxios;