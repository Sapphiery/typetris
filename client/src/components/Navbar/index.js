import React, { Fragment } from "react";
// import { Link, Redirect } from "react-router-dom";
import "./style.css";
import GoogleLogin from "../google";
import { GoogleLogout } from "react-google-login";

const Navbar = (props) => {
    
    return(
    <Fragment>
    <div>
        <ul className="nav nav-pills nav-justified" id="navbar">
            <li>
                <h1 className="navTitle">Typetris</h1>
            </li>
            <li>
                {props.isLoggedIn ? (
                    <div className="logout">
                        <h6 id="userName">Welcome, {props.name}</h6>
                        <GoogleLogout
                            clientId="937809397647-1pcdbb8tsc0fmevinln3gpilb50q2gfu.apps.googleusercontent.com"
                            // clientId="937809397647-pigoe4b4pg4e2bv84mnrvf8u0agh5hqd.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={props.logout}
                            
                        >
                        </GoogleLogout>
                    </div>
                ) : (
                    <GoogleLogin doLogin={props.doLogin}/>
                )}
            </li>
        </ul>
    </div>
    </Fragment>
    )
}


export default Navbar;