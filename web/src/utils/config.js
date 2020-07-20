export default {

    devBaseUrl : 'http://localhost:3000',
    prodBashUrl : 'http://106.13.63.236',

    baseUrl (){
        return process.env.NODE_ENV !== 'production' ? this.devBaseUrl : this.prodBashUrl;
    }


};