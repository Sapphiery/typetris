// function onSignIn(googleUser) {
//     // Useful data for your client-side scripts:
//    var profile = googleUser.getBasicProfile();
//    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//    console.log('Full Name: ' + profile.getName());
//    console.log(googleUser.getBasicProfile());
//     // The ID token you need to pass to your backend:
//    var id_token = googleUser.getAuthResponse().id_token;
//    console.log("ID Token: " + id_token);
//    var ids = profile.getId();

//    var name = profile.getName();
//    var token = googleUser.getAuthResponse().id_token;

//    var post = {name, token};
//    fetch('/signin', {
//     method: "POST",
//     headers: {
//     'Content-Type': 'application/json'
//     },
//    body: JSON.stringify(post)
//    }).then(function(res){
//    return res.json();
//    }).then(function (result) {
//    console.log(result);
//    });

//    console.log(ids + " this works");
//    console.log(name + " this also works");

//    }

//    function signOut() {
//    var auth2 = gapi.auth2.getAuthInstance();
//    auth2.signOut().then(function () {
//      console.log('User signed out.');
//    });
//      }
//   module.exports = google;
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import {
  GoogleLogout
} from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

const Google = () => {
  return ( <
    GoogleLogin clientId = "937809397647-pigoe4b4pg4e2bv84mnrvf8u0agh5hqd.apps.googleusercontent.com"
    buttonText = "Login"
    onSuccess = {
      responseGoogle
    }
    onFailure = {
      responseGoogle
    }
    cookiePolicy = {
      'single_host_origin'
    }
    />, 
    <GoogleLogout clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com" buttonText = "Logout" onLogoutSuccess = {logout} >
    <
    /GoogleLogout>
  );
};

<
GoogleLogout
clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
buttonText = "Logout"
onLogoutSuccess = {
    logout
  } >
  <
  /GoogleLogout>

export default Google;