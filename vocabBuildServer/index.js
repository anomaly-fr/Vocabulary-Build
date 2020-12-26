const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}));


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vocab_builder'
});
app.get("/", (req, res) => {
    
})

// Register
app.post("/api/register",(req,res) => {
    console.log("req "+req)
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
   // console.log("email "+email)

    const sqlInsert = "INSERT INTO tutees (email,name,password) VALUES (?,?,?)";
    db.query(sqlInsert,[email,name,password],(error,result) => {
            console.log("Result "+result);
            console.log('Error '+error)
            res.json(result);
    })
  //  res.send(result)

});


// Login
app.get("/api/login/:userEmail",(req,res) => {
    const sqlSelect = "SELECT * FROM tutees WHERE email=?";
    const email = req.params.userEmail;
    console.log("Req pars email "+email)
    db.query(sqlSelect,[email],(error,result) => {
        console.log("Req pars useremail "+req.params.userEmail);

        console.log("Result " +result);
        console.log("Error "+error);
        console.log(result);
        

         res.json(result);
    })

});

// register tutor
app.post("/api/registerTutor",(req,res) => {
    const name = req.body.name;
    const tutorEmail = req.body.tutorEmail;
    const password = req.body.password;
   // console.log("email "+email)

    const sqlInsert = "INSERT INTO tutor (tutor_email,name,password) VALUES (?,?,?)";
    db.query(sqlInsert,[tutorEmail,name,password],(error,result) => {
            console.log("Result "+result);
            console.log('Error '+error)
            res.json(result);
    })
  //  res.send(result)

});

app.get("/api/loginTutor/:tutorEmail",(req,res) => {
    console.log("body "+req.body);
    const sqlSelect = "SELECT * FROM tutor WHERE tutor_email=?";
    const tutor_email = req.params.tutorEmail;
    db.query(sqlSelect,[tutor_email],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);
    })

});

app.listen(3000, () => {

    console.log('Connected at 3000')
});
