import React from "react";
import "./style.css";

const GameContainer = props => (
    <div className="GameContainer">
        <table className="game-table">
            <tbody>
            </tbody>
        </table>
        {console.log(props.gameArea)}
    </div>
);

export default GameContainer;