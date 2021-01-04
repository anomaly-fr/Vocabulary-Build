const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

let globalEmail;

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vocab_builder'
});
app.get("/", (req, res) => {

})


// Register
app.post("/api/register", (req, res) => {
    console.log("req " + req)
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO tutee (email,name,password) VALUES (?,?,?)";
    db.query(sqlInsert, [email, name, password], (error, result) => {
        console.log("Result " + result);
        console.log('Error ' + error)
        res.json(result);
    })

});



// Login
app.get("/api/login/:userEmail", (req, res) => {
    const sqlSelect = "SELECT * FROM tutee WHERE email=?";
    const email = req.params.userEmail;
    console.log("Req pars email " + email)
    db.query(sqlSelect, [email], (error, result) => {
        console.log("Req pars useremail " + req.params.userEmail);

        console.log("Result " + result);
        console.log("Error " + error);
        console.log(result);


        globalEmail = email;
        res.json(result);
    })

});




// register tutor
app.post("/api/registerTutor", (req, res) => {
    const name = req.body.name;
    const tutorEmail = req.body.tutorEmail;
    const password = req.body.password;
    // console.log("email "+email)

    const sqlInsert = "INSERT INTO tutor (tutor_email,name,password) VALUES (?,?,?)";
    db.query(sqlInsert, [tutorEmail, name, password], (error, result) => {
        console.log("Result " + result);
        console.log('Error ' + error)
        res.json(result);
    })

});



// Login Tutor
app.get("/api/loginTutor/:tutorEmail", (req, res) => {
    console.log("body " + req.body);
    const sqlSelect = "SELECT * FROM tutor WHERE tutor_email=?";
    const tutorEmail = req.params.tutorEmail;
    db.query(sqlSelect, [tutorEmail], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);
    })

});



// Create Level
app.post("/api/createLevel", (req, res) => {
    const levelName = req.body.level_name;
    const tutor = req.body.tutor_email;

    const sqlInsert = "INSERT INTO level (level_name,tutor_email) VALUES (?,?)";
    db.query(sqlInsert, [levelName, tutor], (error, result) => {
        console.log("Result " + result);
        console.log('Error ' + error)
        res.json(result);
    })
});



// Create Set
app.post("/api/createSet", (req, res) => {
    const setName = req.body.set_name;
    // const tutor = req.body.tutor_email;
    const levelNumber = req.body.level_id;

    const sqlInsert = "INSERT INTO level_set (set_name,level_id) VALUES (?,?)";
    db.query(sqlInsert, [setName, levelNumber], (error, result) => {
        console.log("Result " + result);
        console.log('Error ' + error)
        res.json(result);
    })
});



// Get Levels
app.get("/api/getLevelsByTutor/:tutor_email", (req, res) => {
    console.log("body " + req.body);
    const sqlSelect = "SELECT * FROM level WHERE tutor_email=?";
    const tutorEmail = req.params.tutor_email;
    db.query(sqlSelect, [tutorEmail], (error, result) => {
        console.log("Result " + JSON.stringify(result));
        console.log("Error " + error);
        if(result == [] || result == null || result == undefined)
        res.json('No levels')
        res.json(result);
    })

});



// Get Sets and number of words in each set
app.get("/api/getSetsByLevelNo/:level_id", (req, res) => {
    const sqlSelect = "SELECT * FROM vocab_builder.level_set where level_id=?";
    const levelNo = req.params.level_id;
    db.query(sqlSelect, [levelNo], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);
    })

});



// Add a new word
app.post("/api/addWord", (req, res) => {

    const wordTitle = req.body.word_title;
    const wordCorrectDef = req.body.word_correct_def;
    const wordIncorrect1 = req.body.word_incorrect_1;
    const wordIncorrect2 = req.body.word_incorrect_2;
    const wordIncorrect3 = req.body.word_incorrect_3;
    const setNo = req.body.set_id;



    
    const sqlInsert = "INSERT INTO word (word_title,word_correct_def,word_incorrect_1,word_incorrect_2,word_incorrect_3,set_id) VALUES (?,?,?,?,?,?);";
    const sqlUpdate = "UPDATE level_set SET number_of_words=(number_of_words+1) WHERE set_id=?";
    db.query(sqlInsert, [wordTitle, wordCorrectDef, wordIncorrect1, wordIncorrect2, wordIncorrect3, setNo], (error, result) => {
        console.log("Result " + result);
        console.log('Error ' + error)
        db.query(sqlUpdate,[setNo],(err,res) => {
            console.log("Result "+res);
            console.log('Error ' + err);
        })
        res.json(result);
    })
});



// Get words
app.get("/api/getWordsBySetNo/:set_id", (req, res) => {
    const setNo = req.params.set_id;
    const sqlSelect = "SELECT word_id,word_title,word_correct_def,word_incorrect_1,word_incorrect_2,word_incorrect_3,set_id FROM word WHERE set_id=?";
    db.query(sqlSelect, [setNo], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    })

});

// Delete word
app.post("/api/deleteWordByWordId/:word_id", (req, res) => {
    const wordID = req.params.word_id;
    const setID = req.body.set_id;
    const sqlDelete = "DELETE FROM word WHERE word_id=?";
    const sqlUpdate = "UPDATE level_set SET number_of_words=(number_of_words-1) WHERE set_id =?";
    db.query(sqlDelete, [wordID], (error, result) => {
        console.log("Deleted " + result);
        console.log("Error " + error);

        db.query(sqlUpdate,[setID],(e,r) => {
            console.log("Updated "+setID +" "+ r);
            console.log("Error " + e);
            res.json(r);


        })

    })

});



// Get all tutors
app.get("/api/getAllTutors", (req, res) => {
    const sqlSelect = "SELECT tutor.tutor_email,password,name,COUNT(level.tutor_email) AS number_of_levels FROM tutor JOIN level ON (tutor.tutor_email=level.tutor_email) GROUP BY level.tutor_email;";
    db.query(sqlSelect, (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    })

});



// Get number of words by tutor email
app.get("/api/getNumberOfWordsByTutorEmail", (req, res) => {
    const sqlSelect = "SELECT COUNT(word_title) AS number_of_words FROM word WHERE set_id IN (SELECT set_id FROM level_set WHERE level_id IN(SELECT level_id FROM level WHERE tutor_email=?));";
    const tutorEmail = req.params.tutor_email;
    db.query(sqlSelect, [tutorEmail], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});



// Get words by set_id
app.get("/api/getWordsBySetId/:set_id", (req, res) => {
    const sqlSelect = "SELECT * FROM word where set_id=?";
    const set_id = req.params.set_id;
    db.query(sqlSelect, [set_id], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});


// get number of words in set
app.get("/api/getNumberOfWordsBySetId/:set_id", (req, res) => {
    const sqlSelect = "SELECT number_of_words FROM vocab_builder.level_set where set_id=?";
    const set_id = req.params.set_id;
    db.query(sqlSelect, [set_id], (error, result) => {
        console.log("Result " + JSON.stringify(result));
        console.log("Error " + error);

        res.json(result);

    });

});



// update best score
app.post("/api/updateBestScore/:score_type", (req, res) => {
    const set_id = req.body.set_id;
    const email = req.body.email;
    const best_score_quiz = req.body.best_score_quiz;
    const best_score_audio = req.body.best_score_audio;
    const score_type = req.params.score_type;
    const sqlInsert1 = "INSERT INTO score(email,set_id,best_score_quiz) VALUES (?,?,?) ON DUPLICATE KEY UPDATE best_score_quiz= GREATEST(best_score_quiz,VALUES(best_score_quiz));";
    const sqlInsert2 = "INSERT INTO score(email,set_id,best_score_audio) VALUES (?,?,?) ON DUPLICATE KEY UPDATE best_score_audio= GREATEST(best_score_audio,VALUES(best_score_audio));";
    if (score_type === 'quiz') {
        db.query(sqlInsert1, [email, set_id, best_score_quiz], (error, result) => {
            console.log("Result " + result);
            console.log("Error " + error);
            db.query('SELECT * FROM score WHERE email=? AND set_id=?', [email, set_id], (error1, result1) => {
                console.log(JSON.stringify(result1));
                console.log(error1);
                res.json(result1);
            })


        });



    }
    else if (score_type === 'audio') {
        db.query(sqlInsert2, [email, set_id, best_score_audio], (error, result) => {
            console.log("Result " + result);
            console.log("Error " + error);
            db.query('SELECT * FROM score WHERE email=? AND set_id=?', [email, set_id], (error1, result1) => {
                console.log(JSON.stringify(result1));
                console.log(error1);
                res.json(result1);
            })


        });



    }



});




// Get stats per set
app.get("/api/getSetStats/:set_id", (req, res) => {
    const sqlQuery1 = "SELECT ifNull(MAX(best_score_quiz),0) AS highest_quiz_score, ifNull(MAX(best_score_audio),0) AS highest_audio_score,ifNull(Avg(best_score_quiz),0)  AS average_quiz_score, ifNull(Avg(best_score_audio),0) AS average_audio_score, ifNull(email,'-') FROM score WHERE set_id = ?;";
    const sqlQuery2 = "SELECT ifNull(email,'-'),ifNull(best_score_audio,0),ifNull(best_score_quiz,0),ifNull((best_score_audio + best_score_quiz),0) AS total,name FROM score JOIN tutee USING (email) ORDER  BY total DESC LIMIT  1;"
    const set_id = req.params.set_id;
    db.query(sqlQuery1, [set_id], (error1, result1) => {
        console.log("Result " + JSON.stringify(result1));
        console.log("Error " + error1);

        // db.query(sqlQuery2, (error2, result2) => {
        //     console.log("Result " + result2);
        //     console.log("Error " + error2);

        //    const response = {
        //        stats : result1,
        //        topper : result2
        //    }
    
        //    console.log(":) "+JSON.stringify(response));
           res.json(result1);
    
       // });


    });

});

// Get leaderboard by level
app.get("/api/getLevelLeaderboard/:level_id", (req, res) => {
    const sqlSelect = "SELECT email,SUM(best_score_audio+best_score_quiz) AS level_total,name FROM score JOIN tutee USING(email) WHERE set_id IN (SELECT set_id FROM level_set WHERE level_id=?)  GROUP BY email ORDER BY level_total DESC;";
    const level_id = req.params.level_id;
    db.query(sqlSelect, [level_id], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});


// Get tutor stats
app.get("/api/getTutorStats/:tutor_email", (req, res) => {
    const sqlSelect = "select tutor_email,level_id,level_name,set_id,set_name,number_of_words,max(best_score_quiz) as highest_quiz_score,avg(best_score_quiz) as average_quiz_score,max(best_score_audio) as highest_audio_score,avg(best_score_audio) as average_quiz_score,avg(best_score_audio) as average_audio_score,max(total) as best_total,avg(total) as average_total from full_tutor_analysis where tutor_email=? group by set_id ORDER BY level_name;"
    // const sqlSelect = "SELECT TUTOR_email,level_id,level_name,set_id,set_name,MAX(best_score_quiz) AS highest_quiz_score,AVG(best_score_quiz) AS average_quiz_score, MAX(best_score_audio) as highest_audio_score,AVG(best_score_quiz) AS average_quiz_score,MAX(total) AS best_total,AVG(total) AS average_total FROM full_tutor_analysis WHERE tutor_email=? GROUP BY set_id ORDER BY level_name;";
    const tutorEmail = req.params.tutor_email;
    db.query(sqlSelect, [tutorEmail], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});


// Get per set stats for tutors
// multiple join
app.get("/api/getTutorSetWiseStats/:set_id", (req, res) => {
    const sqlSelect = "select score.email,name,set_id,number_of_words,best_score_audio,best_score_quiz from score join tutee using (email) join level_set using(set_id) where set_id=?;";
    // const sqlSelect = "SELECT TUTOR_email,level_id,level_name,set_id,set_name,MAX(best_score_quiz) AS highest_quiz_score,AVG(best_score_quiz) AS average_quiz_score, MAX(best_score_audio) as highest_audio_score,AVG(best_score_quiz) AS average_quiz_score,MAX(total) AS best_total,AVG(total) AS average_total FROM full_tutor_analysis WHERE tutor_email=? GROUP BY set_id ORDER BY level_name;";
    const setId = req.params.set_id;
    db.query(sqlSelect, [setId], (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});

app.get("/api/getLeaderboard", (req, res) => {
    const sqlSelect = "select * from points;";
    
    // const sqlSelect = "SELECT TUTOR_email,level_id,level_name,set_id,set_name,MAX(best_score_quiz) AS highest_quiz_score,AVG(best_score_quiz) AS average_quiz_score, MAX(best_score_audio) as highest_audio_score,AVG(best_score_quiz) AS average_quiz_score,MAX(total) AS best_total,AVG(total) AS average_total FROM full_tutor_analysis WHERE tutor_email=? GROUP BY set_id ORDER BY level_name;";
    db.query(sqlSelect, (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});

app.post("/api/markLookUp", (req, res) => {
    const sqlUpdate = "INSERT INTO dictionary VALUES (?,?);";
    const email = req.body.user_email;
    const word = req.body.search_term;
    db.query(sqlUpdate,[email,word], (error, result) => {
        console.log("Done " + result);
        console.log("Error " + error);

        res.json(result);

    });

});


// fetch all words ordered
app.get("/api/getAllWords", (req, res) => {
    const sqlSelect = "SELECT word_title,word_correct_def FROM word USE INDEX(all_words_ordered);";
    
    db.query(sqlSelect, (error, result) => {
        console.log("Result " + result);
        console.log("Error " + error);

        res.json(result);

    });

});








app.listen(3000, () => {

    console.log('Connected at 3000')
});
