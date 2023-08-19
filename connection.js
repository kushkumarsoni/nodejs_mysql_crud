const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_crud',
});


mysqlConnection.connect((err)=>{
    if(err){
        console.log("Error in db connection"+JSON.stringify(err,undefined,2));
    }else{
        console.log("DB Connected Successfully");
    }
});

module.exports = mysqlConnection;