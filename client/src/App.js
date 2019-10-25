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
  render() {
    return (
      <Wrapper >
        <Navbar />
        <Backdrop />
        <GameContainer />
        <Leaderboard />
        <Info />
        <PreviewBlocks />
        <Score />
      </Wrapper>
    );
  }
}

export default App;
