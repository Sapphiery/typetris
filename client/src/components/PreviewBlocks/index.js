import React from "react";
import "./style.css";

function PreviewBlocks (props) {

    const next = props.NextBlock;

    return (
    <div className="right">
        <div className="PreviewBlocks">
            <h3 className="PBtitle">Next Block:</h3>
            <p className="nextBlock" >{next.name}</p>
            {console.log("next: ", next)}
        </div>
        <div className="Info">
            <h1 className = "title">Instructions:</h1>
            <p className="infoText">Etc...</p>
        </div>
    </div>
    );
};

export default PreviewBlocks;