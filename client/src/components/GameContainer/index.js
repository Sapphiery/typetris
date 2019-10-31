import React from "react";
import "./style.css";

const GameContainer = props => {
  return(
    <div className="GameContainer">
        <table className="game-table">
            <tbody>
              {props.gameState ? props.gameState.body.map((row, idx) => 
                <tr key={idx}>
                  {row.map((cell, cellIdx) =>
                    <td key={cellIdx} className={cell.cssClasses.join(' ')}></td>
                  )}
                </tr>
              ) : <tr><td>Loading....</td></tr>}
            </tbody>
        </table>
    </div>
  );
};

export default GameContainer;
