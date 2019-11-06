const express = require("express");
const path = require("path");
const RandomWord = require('random-word');
const PORT = process.env.PORT || 3001;
const app = express();
var connection = require("./connection");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/randomword", (req,res) => {
  res.json({word: RandomWord()});
});


app.post("/signin", (req, res) => {
  // add logic to store user details in DB.
  // req.body.googleId, req.body.highScore, etc...
  connection.query(`SELECT * FROM users WHERE googleid=${req.body.googleId}`, function (err,result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    if (!result.length) {
      connection.query('INSERT INTO users (name, googleid, highscore) VALUES (?,?,?)', [req.body.name, req.body.googleId, req.body.highScore], function (err,newUser) {
        if(err) throw err;
        console.log('Successfully saved id and name to db.', newUser);
        res.json({success: true, msg: 'User details saved to DB', user: newUser});
      });
    } else {
      console.log("User already exists");
      res.json({success: true, msg: 'User already exists', result: result});
    }
  });
  
});

app.post("/updatehighscore/:id", (req, res) => {
  connection.query('INSERT INTO users (name, googleid, highscore) VALUES (?,?,?)', [req.body.name, req.body.googleId, req.body.highScore], function (err, result) {
    if (err) throw err;
    console.log('Successfully saved id and name to db.', result);
    res.json({success: true, msg: 'User details saved to DB'});
  });
});


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});