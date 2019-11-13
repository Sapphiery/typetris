import React from "react";
import "./style.css";

function Score (props) {

    {console.log('Score here', props.leaderboard)}

    return(

    <div className="left">
        <div className="Score">
            <h6 className="cScore">Current Score: <span className="currentScore">{props.currentScore}</span></h6>
            <h6 className="hScore">High Score: <span className="highScore">{props.highScore}</span></h6>
        </div>
        <div className="Leaderboard">
            <h3 className="leaderTitle">Leaderboard - Top 10</h3>
            <ol>
                {props.leaderboard.map((scores, key) => (
                    <li className="listitem" key={key}>{scores.name}: {scores.highscore}</li>
                ))}
            </ol>
        </div>
        <button id="leaderboards">Leaderboards</button>
    </div>

    )
}

export default Score;