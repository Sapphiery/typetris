import React from "react";
import "./style.css";

function GameContainer (props) { 

    const row = props.row

    return (
    <div className="GameContainer">
        <button className="start" onClick={props.start}>START</button>
        <table className="game-table">
            <tbody>
                {row.map(cell => (
                    <tr>
                        {cell.map((css) => (
                            <td className={css.cssClasses.join(" ")} key={css.value}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default GameContainer;