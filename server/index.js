const express = require("express");
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database:'employeeform'
});


app.use(express.json());



app.post("/create", (req,res)=>{
   const {name,surname,email,mobile,unit,cost,totalprice,gst,grandtotal} = req.body;
   db.query(
       'INSERT INTO customer (name,surname,email,mobile,unit,cost,totalprice,gst,grandtotal) VALUES(?,?,?,?,?,?,?,?,?)',
       [name,surname,email,mobile,unit,cost,totalprice,gst,grandtotal], (err,result) => {
           if(err){
               console.log(err)
           }else{
               res.send("Values Inserted")
           }
       }
       );
});


app.listen(3001, ()=>{
    console.log("Serving running on Port 3001");
})