import React from "react";
import Leaderboard from "../Leaderboard";
import "./style.css";

function GameContainer (props) { 

    const row = props.row

    return (
    <div className="GameContainer">
        <button className="start" onClick={props.start}>START</button>
        <button className="start restart" style={{display:"none"}} onClick={props.restart}>PLAY AGAIN</button>
        <div className="wordContainer">
            <h1 className="currentWord">{props.currentword}</h1>
            {console.log("currentword: ", props.correctletters)}
        </div>
        <table className="game-table">
            <tbody>
                {row.map((cell, rowkey) => (
                    <tr key={rowkey}>
                        {cell.map((css, cellkey) => (
                            <td className={css.cssClasses.join(" ")} key={cellkey}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <Leaderboard />
    </div>
    );
};

export default GameContainer;