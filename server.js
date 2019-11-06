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

<<<<<<< HEAD
app.post("/signin", (req, res) => {
  // add logic to store user details in DB.
  // req.body.googleId, req.body.highScore, etc...
  connection.query(`SELECT * FROM users WHERE googleid=${req.body.googleId}`, function (result) {
    if (!result) {
      connection.query('INSERT INTO users (name, googleid, highscore) VALUES (?,?,?)', [req.body.name, req.body.googleId, req.body.highScore], function (newUser) {
        console.log('Successfully saved id and name to db.', newUser);
        res.json({success: true, msg: 'User details saved to DB'}, newUser);
      });
    } else {
      res.json({success: true, msg: 'User already exists'}, result);
    }
  });
  
});

app.post("/updatehighscore/:id", (req, res) => {
  connection.query('INSERT INTO users (name, googleid, highscore) VALUES (?,?,?)', [req.body.name, req.body.googleId, req.body.highScore], function (result) {
    console.log('Successfully saved id and name to db.', result);
    res.json({success: true, msg: 'User details saved to DB'});
  });
});


=======
>>>>>>> 06b13c7c6dc959748b8e852d8c379a1c1b1dbe16
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
