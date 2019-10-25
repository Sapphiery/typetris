import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Info from './components/Leaderboard';
import PreviewBlocks from './components/PreviewBlocks';
import Score from './components/Score';

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
        <GameContainer />
        <Leaderboard />
        <Info />
        <PreviewBlocks />
        <Score 
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          />
      </Wrapper>
    );
  }
}

export default App;
