import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Leaderboard from './components/Leaderboard';
import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import GameContainer from './components/GameContainer';
import PreviewBlocks from './components/PreviewBlocks';
import Score from './components/Score';

import "./assets/css/general.css";
import "./assets/js/script.js";

class App extends Component {
  state = {
    highScore: 0,
    currentScore: 0
  }

  render() {
    return (
      <Wrapper >
        <Navbar />
        <Backdrop />
        <Score 
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          />
        <GameContainer />
        <PreviewBlocks />
        <Leaderboard />     
      </Wrapper>
    );
  }
}

export default App;
