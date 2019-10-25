import React from "react";
import "./style.css";

const Score = props => (
    <div className="Score">
        <p className="cScore">Current Score: <span className="currentScore">{props.currentScore}</span></p>
        <p className="hScore">High Score: <span className="highScore">{props.highScore}</span></p>
    </div>
)

export default Score;