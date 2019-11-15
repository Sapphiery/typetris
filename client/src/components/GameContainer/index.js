import React from "react";
import Leaderboard from "../Leaderboard";
import "./style.css";

function GameContainer (props) { 

    const row = props.row
    const wordPosition = props.correctletters

    return (
    <div className="GameContainer">
        <button className="start" onClick={props.start}>START</button>
        <button className="restart" style={{display:"none"}} onClick={props.restart}>PLAY AGAIN?</button>
        <div className="wordContainer">
        <h1 className="currentWord"><span className={wordPosition ? "highlight" : ""}>{props.currentword.substring(0, wordPosition) || ""}</span>{props.currentword.substring(wordPosition) || ""}</h1>
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
        <Leaderboard 
            leaderboard={props.leaderboard}
        />
    </div>
    );
};

export default GameContainer;