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
import Engine from 'tetris-engine';

import "./assets/css/general.css";
import "./assets/js/script.js";

class App extends Component {
  state = {
    highScore: 0,
    currentScore: 0,
    gameArea: [],
    nextShape: {},
    gameStatus: 0,
    game: null
  }

  componentDidMount() {
    let areaHeight = 20;
    let areaWidth = 15;

    let renderFunct = gameState => {
      let newState = {
        currentScore: this.currentScore + gameState.statistic.countLinesReduced,
        gameArea: gameState.body,
        nextShape: gameState.nextShape,
        gameStatus: gameState.gameStatus
      };
      this.setState(newState);
    }

    const game = new Engine(
      areaHeight,
      areaWidth,
      renderFunct
    );

    this.setState({game: game});
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
