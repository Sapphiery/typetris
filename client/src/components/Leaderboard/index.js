import React from "react";
import "./style.css";

const Leaderboard = props => (
    <div className="leaderContainer">
    <div className="LeaderboardFull">
        <h1 className="leaderboardFullTitle">Leaderboard</h1>
        <ol className="highscores">
            {props.leaderboard.map((scores, key) => (
                <li className="listitem" key={key}>{scores.name}: {scores.highscore}</li>
            ))}
        </ol>
    </div>
    </div>
);

export default Leaderboard;