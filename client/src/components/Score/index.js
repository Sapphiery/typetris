import React from "react";
import "./style.css";

const Score = props => (
    <div className="left">
        <div className="Score">
            <h6 className="cScore">Current Score: <span className="currentScore">{props.currentScore}</span></h6>
            <h6 className="hScore">High Score: <span className="highScore">{props.highScore}</span></h6>
        </div>
        <div className="Leaderboard">
            <h3 className="leaderTitle">Leaderboard - Top 10</h3>
            <ol>
                <li>Name 1</li>
                <li>Name 2</li>
                <li>Name 3</li>
                <li>Name 4</li>
                <li>Name 5</li>
                <li>Name 6</li>
                <li>Name 7</li>
                <li>Name 8</li>
                <li>Name 9</li>
                <li>Name 10</li>
            </ol>
        </div>
        <button id="leaderboards">Leaderboards</button>
    </div>
)

export default Score;