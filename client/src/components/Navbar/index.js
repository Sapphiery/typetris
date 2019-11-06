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
<<<<<<< HEAD
                <GoogleLogin doLogin={props.doLogin} />
                
=======
                <GoogleLogin />
>>>>>>> 06b13c7c6dc959748b8e852d8c379a1c1b1dbe16
            </li>
        </ul>
    </div>
    </Fragment>
)


export default Navbar;