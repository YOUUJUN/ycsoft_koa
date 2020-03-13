import axios from 'axios';

// let $axios = axios.create({
//     baseURL : "http://localhost:3000",
//     withCredentials :true
// });



let myDIYAxios = function(options){

    console.log("well, i think i can do something here");

    let $axios = axios.create({
        baseURL : "http://localhost:3000",
        withCredentials :true
    });

    $axios.interceptors.request.use(function (config) {
        let marscript = window.localStorage.getItem("marscript");
        if (marscript) {
            config.headers.accessToken = marscript;
            // config.headers['accessToken'] = Token;
            return config;
        }
    }, function (error) {
        return Promise.reject(error);
    });


    return $axios(options);
}

export default myDIYAxios;