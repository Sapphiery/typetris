import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Info from './components/Info';
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
        <Score 
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          />
        <Leaderboard />
        <GameContainer />
        <PreviewBlocks />
        <Info />      
      </Wrapper>
    );
  }
}

export default App;
