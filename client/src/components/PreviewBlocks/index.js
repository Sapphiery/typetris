import React from "react";
import "./style.css";

function PreviewBlocks (props) {

    const next = props.NextBlock;
    console.log("Body", next.body)

    return (
    <div className="right">
        <div className="PreviewBlocks">
            <h3 className="PBtitle">Next Block:</h3>
            {console.log("next: ", next)}
            <table className="PreviewContainer">
                <tbody>
                    {next.body ? next.body.map((cell, rowkey) => (
                        <tr key={rowkey}>
                            {cell.map((val, key) => (
                                <td className={val > 0 && "heap " + next.name}></td>
                            ))}
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
        <div className="Info">
            <h1 className = "title">Instructions:</h1>
            <p className="infoText">Etc...</p>
        </div>
    </div>
    );
};

export default PreviewBlocks;