const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Hadassah1029',
    database:'customerform'
});
var requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    console.log(req.requestTime);
    next()
  }
  
  app.use(requestTime)


app.use(express.json());
app.use(cors());

// Post - saving data into customer table in mysql
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
});//app.post

// get Customer based on ID

app.get('/customer/:id', (req,res) => {
    const {id} = req.params;
    console.log(id, " params ID")
    db.query('SELECT * FROM customer WHERE id=?', id, (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
            console.log(result,"response from Server while getting customer based on ID");
        }
    })
});//app.get



app.listen(3001, ()=>{
    console.log("Serving running on Port 3001");
})