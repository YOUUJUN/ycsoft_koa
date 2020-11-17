let password = (process.env.NODE_ENV !== 'production') ? "" : "KHIS302.";
console.log("password",password);

const config = {
    connectionLimit : 10,
    host : 'localhost',
    user :'root',
    password : password,
    port : '3306',
    database : 'ycsoft',
    multipleStatements: true
};
module.exports = config;
