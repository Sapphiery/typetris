import React from "react";
import "./style.css";

const Wrapper = props => (
    <div class="container">
        {props.children}
    </div>
)

export default Wrapper;