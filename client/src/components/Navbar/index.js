import React from "react";
// import { Link, Redirect } from "react-router-dom";
import "./style.css";

const Navbar = props => (
    <div>
        <ul className="nav nav-pills nav-justified" id="navbar">
            <li>
                <h1 className="navTitle">Typetris</h1>
            </li>
            <li>
                <button className="login" to="">Login</button>
            </li>
        </ul>
    </div>
)

export default Navbar;