const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');  // importing mysql



// configuring database
const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: 'masteroot',
    database: 'cruddatabase',
});

app.get('/', (req,res) => {

    const sqlInsert = "INSERT INTO movie_reviews (mName, mReview) VALUES ('inception', 'excellent');"
    db.query(sqlInsert, (err,result) => {
        res.send(" database testing");
        if (err) throw err;
    });
    
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM movie_reviews;"
    db.query(sqlSelect,  (err,result) => {
        res.send(result);
        if (err) throw err;
    });
});

app.post('/api/insert', (req, res) => {
    const mName = req.body.mName;
    const mReview = req.body.mReview;

    const sqlInsert = "INSERT INTO movie_reviews (mName, mReview) VALUES (?,?);"
    db.query(sqlInsert, [mName, mReview], (err,result) => {
        res.send(" data successfully fetched form react");
        if (err) throw err;
    });
});

app.delete('/api/delete/:delmovie', (req, res) => {
    const Name = req.params.delmovie;

    const sqlDelete = "DELETE FROM movie_reviews WHERE mName = ?;"
    db.query(sqlDelete, Name, (err,result) => {
        if (err) throw err;
    });
});

app.put('/api/update', (req, res) => {
    const mName = req.body.mName;
    const mReview = req.body.mReview;

    const sqlUpdate = "UPDATE movie_reviews SET mReview = ? WHERE mName = ?;"
    db.query(sqlUpdate, [mReview, mName], (err,result) => {
        if (err) throw err;
    });
});


app.listen(1432, () => {
    console.log("running on port 1432");
});
