const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
var port = 3000;
var app = express();
app.use(bodyParser.json());

/**
 * api for get all records from table
 */
app.get("/employees",(req,res)=>{
    connection.query("SELECT * FROM employees",(err,rows) => {
        if(err){
            console.log(err);
        }else{
          // console.log(rows);
           res.send(rows);
        }
    })
});

/**
 * api for get single records from table
*/
app.get("/employees/:id",(req,res)=>{
    connection.query('SELECT * FROM employees WHERE id=?',[req.params.id],(err,rows) => {
        if(err){
            console.log(err);
        }else{
           //console.log(rows);
           res.send(rows);
        }
    })
});

/**
 * api for get single records from table
*/
app.delete("/employees/:id",(req,res)=>{
    connection.query("DELETE FROM employees where id=?",[req.params.id],(err,rows) => {
        if(err){
            console.log(err);
        }else{
           res.send(rows);
        }
    })
});

/**
 * api for save records into table
*/
app.post("/employees",(req,res)=>{
    var emp = req.body;
    var empData = [emp.name,emp.email,emp.mobile];
    connection.query("INSERT INTO employees(name,email,mobile) values(?)",[empData],(err,rows) => {
        if(err){
            console.log(err);
        }else{
           res.send(rows);
        }
    })
});

/**
 * api for update records into table
*/
app.patch("/employees",(req,res)=>{
    var emp = req.body;
    connection.query("UPDATE employees set ? where id="+emp.id,[emp],(err,rows) => {
        if(err){
            console.log(err);
        }else{
           res.send(rows);
        }
    })
});

/**
 * api for update and insert records into table
*/
app.put("/employees",(req,res)=>{
    var emp = req.body;
    connection.query("UPDATE employees set ? where id="+emp.id,[emp],(err,rows) => {
        if(err){
            console.log(err);
        }else{
            if(rows.affectedRows == 0){
                var emp = req.body;
                var empData = [emp.name,emp.email,emp.mobile];
                connection.query("INSERT INTO employees(name,email,mobile) values(?)",[empData],(err,rows) => {
                    if(err){
                        console.log(err);
                    }else{
                    res.send(rows);
                    }
                })
            }else{
                res.send(rows);
            }
        }
    })
});

app.listen(port,()=>console.log(`Server is running on port : ${port}`));