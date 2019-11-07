import React, { Fragment } from "react";
// import { Link, Redirect } from "react-router-dom";
import "./style.css";
import GoogleLogin from "../google";
const Navbar = props => (
    <Fragment>
    
    <div>
        <ul className="nav nav-pills nav-justified" id="navbar">
            <li>
                <h1 className="navTitle">Typetris</h1>
            </li>
            <li>
                <GoogleLogin doLogin={props.doLogin}/>
            </li>
        </ul>
    </div>
    </Fragment>
)


export default Navbar;