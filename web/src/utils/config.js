export default {

    devBaseUrl : 'http://localhost:3000',
    // prodBashUrl : 'http://106.13.63.236',
    prodBashUrl : 'http://192.168.1.40:3000',

    baseUrl (){
        if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "devBuild"){
            return this.devBaseUrl;
        }else{
            return this.prodBashUrl
        }
    }

};
