const express = require("express");
const path = require("path");
const RandomWord = require('random-word');
const PORT = process.env.PORT || 3001;
const app = express();

//google authenticator
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("937809397647-gas1u50s7actrh9d53t7hqplr00gvia5.apps.googleusercontent.com");

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

//google authenticator
module.exports = function(app) {
  app.post("/signin", function(req, res){
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: "937809397647-gas1u50s7actrh9d53t7hqplr00gvia5.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
      console.log('here is userid: ', userid);
      console.log('here is name: ', req.body.name);
      connection.query('INSERT INTO users (name, googleid, highscore) VALUES (?,?,?)', [req.body.name, userid, '90'], function (result) {
        console.log('Successfully saved id and name to db.', result);
        res.json({"sucess": true})
      });
    }
    verify().catch(console.error);

    // req.body - contain all data you pass from client side
    
  });
//end of google authenticator

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
