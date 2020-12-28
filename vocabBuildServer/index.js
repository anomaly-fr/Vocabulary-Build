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

    const sqlInsert = "INSERT INTO tutee (email,name,password) VALUES (?,?,?)";
    db.query(sqlInsert,[email,name,password],(error,result) => {
            console.log("Result "+result);
            console.log('Error '+error)
            res.json(result);
    })

});



// Login
app.get("/api/login/:userEmail",(req,res) => {
    const sqlSelect = "SELECT * FROM tutee WHERE email=?";
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

});



// Login Tutor
app.get("/api/loginTutor/:tutorEmail",(req,res) => {
    console.log("body "+req.body);
    const sqlSelect = "SELECT * FROM tutor WHERE tutor_email=?";
    const tutorEmail = req.params.tutorEmail;
    db.query(sqlSelect,[tutorEmail],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);
    })

});



// Create Level
app.post("/api/createLevel",(req,res) => {
    const levelName = req.body.level_name;
    const tutor = req.body.tutor_email;

    const sqlInsert = "INSERT INTO level (level_name,tutor_email) VALUES (?,?)";
    db.query(sqlInsert,[levelName,tutor],(error,result) => {
        console.log("Result "+result);
        console.log('Error '+error)
        res.json(result);
    })
});



// Create Set
app.post("/api/createSet",(req,res) => {
    const setName = req.body.set_name;
   // const tutor = req.body.tutor_email;
   const levelNumber = req.body.level_id;

    const sqlInsert = "INSERT INTO level_set (set_name,level_id) VALUES (?,?)";
    db.query(sqlInsert,[setName,levelNumber],(error,result) => {
        console.log("Result "+result);
        console.log('Error '+error)
        res.json(result);
    })
});



// Get Levels
app.get("/api/getLevelsByTutor/:tutor_email",(req,res) => {
    console.log("body "+req.body);
    const sqlSelect = "SELECT * FROM level WHERE tutor_email=?";
    const tutorEmail = req.params.tutor_email;
    db.query(sqlSelect,[tutorEmail],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);
    })

});



// Get Sets and number of words in each set
app.get("/api/getSetsByLevelNo/:level_id",(req,res) => {
    console.log("body "+req.body);
    const sqlSelect = "SELECT ls.set_id,set_name,level_id,w.set_id,COUNT(w.set_id) AS number_of_words FROM level_set ls JOIN word w ON (ls.set_id=w.set_id) WHERE level_id=? GROUP BY w.set_id;";
    const levelNo = req.params.level_id;
    db.query(sqlSelect,[levelNo],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);
    })

});



// Add a new word
app.post("/api/addWord",(req,res) => {

    const wordTitle = req.body.word_title;
    const wordCorrectDef = req.body.word_correct_def;
    const wordIncorrect1 = req.body.word_incorrect_1;
    const wordIncorrect2 = req.body.word_incorrect_2;
    const wordIncorrect3 = req.body.word_incorrect_3;
    const setNo = req.body.set_id;

    

    const sqlInsert = "INSERT INTO word (word_title,word_correct_def,word_incorrect_1,word_incorrect_2,word_incorrect_3,set_id) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert,[wordTitle,wordCorrectDef,wordIncorrect1,wordIncorrect2,wordIncorrect3,setNo],(error,result) => {
        console.log("Result "+result);
        console.log('Error '+error)
        res.json(result);
    })
});



// Get words
app.get("/api/getWordsBySetNo/:set_id",(req,res) => {
    const setNo = req.params.set_id;
    const sqlSelect = "SELECT word_id,word_title,word_correct_def,word_incorrect_1,word_incorrect_2,word_incorrect_3,set_id FROM word WHERE set_id=?";
    db.query(sqlSelect,[setNo],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);

    })

});

// Delete word
app.delete("/api/deleteWordByWordId/:word_id",(req,res) => {
    const wordID = req.params.word_id;
    const sqlDelete = "DELETE FROM word WHERE word_id=?";
    db.query(sqlDelete,[wordID],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);
    })

});



// Get all tutors
app.get("/api/getAllTutors",(req,res) => {
    const sqlSelect = "SELECT tutor.tutor_email,password,name,COUNT(level.tutor_email) AS number_of_levels FROM tutor JOIN level ON (tutor.tutor_email=level.tutor_email) GROUP BY level.tutor_email;";
    db.query(sqlSelect,(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);

    })

});



// Get number of words by tutor email
app.get("/api/getNumberOfWordsByTutorEmail",(req,res) => {
    const sqlSelect = "SELECT COUNT(word_title) AS number_of_words FROM word WHERE set_id IN (SELECT set_id FROM level_set WHERE level_id IN(SELECT level_id FROM level WHERE tutor_email=?));";
    const tutorEmail = req.params.tutor_email;
    db.query(sqlSelect,[tutorEmail],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);

    });

});



// Get words by set_id
app.get("/api/getWordsBySetId/:set_id",(req,res) => {
    const sqlSelect = "SELECT * FROM word where set_id=?";
    const set_id = req.params.set_id;
    db.query(sqlSelect,[set_id],(error,result) => {
        console.log("Result " +result);
        console.log("Error "+error);
        
         res.json(result);

    });

});








app.listen(3000, () => {

    console.log('Connected at 3000')
});
