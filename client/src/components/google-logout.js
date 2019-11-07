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
    clientId="937809397647-1pcdbb8tsc0fmevinln3gpilb50q2gfu.apps.googleusercontent.com"
    buttonText="Logout"
    onLogoutSuccess={logout}
    >
    </GoogleLogout>
  );
};

export default GLogout;

