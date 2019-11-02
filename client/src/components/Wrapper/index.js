import React from "react";
import "./style.css";

const Wrapper = props => (
    <div className="container">
        {props.children}
    </div>
)

export default Wrapper;