import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const GLogout = () => {
  return (
    <GoogleLogout
    clientId="937809397647-pigoe4b4pg4e2bv84mnrvf8u0agh5hqd.apps.googleusercontent.com"
    buttonText="Logout"
    onLogoutSuccess={logout}
    >
    </GoogleLogout>
  );
};

export default GLogout;

