import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./style.css";

const Navbar = props => (
    <div>
        <ul className="nav nav-pills nav-justified" id="navbar">
            <li>
                <h1>Typetris</h1>
            </li>
            <li>
                <Link className="login" to="" role="button">Login</Link>
            </li>
        </ul>
    </div>
)

export default Navbar;