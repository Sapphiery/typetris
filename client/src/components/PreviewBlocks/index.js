import React from "react";
import "./style.css";

function PreviewBlocks (props) {

    const next = props.NextBlock;

    return (
    <div className="right">
        <div className="PreviewBlocks">
            <h3 className="PBtitle">Next Block:</h3>
            <table className="PreviewContainer">
                <tbody>
                    {next.body ? next.body.map((cell, rowkey) => (
                        <tr key={rowkey}>
                            {cell.map((val, key) => (
                                <td className={val > 0 && "shape " + next.name}></td>
                            ))}
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
        <div className="Info">
            <h1 className = "title">Instructions:</h1>
            <ul className="infoText">
                <li>Control blocks with arrow keys</li>
                <li>Controls are locked for each block until you type the word shown</li>
                <li>Don't mistype or the game will speed up!</li>
            </ul>
        </div>
    </div>
    );
};

export default PreviewBlocks;