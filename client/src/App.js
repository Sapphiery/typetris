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
import {Engine} from 'tetris-engine';

import "./assets/css/general.css";
import "./assets/js/script.js";

class App extends Component {
  state = {
    highScore: 0,
    currentScore: 0,
    gameArea: [],
    nextShape: {},
    gameStatus: 0,
    game: null,
    gameInterval: null,
    gameSpeed: 1000
  }

  componentDidMount() {
    let areaHeight = 20;
    let areaWidth = 15;

    let renderFunct = gameState => {
      let score = this.state.currentScore;
      let newScore = gameState.statistic.countLinesReduced;
      let newState = {
        currentScore: newScore,
        gameArea: gameState.body,
        nextShape: gameState.nextShape,
        gameStatus: gameState.gameStatus,
        gameSpeed: newScore > score ? this.state.gameSpeed - ((newScore - score) * 5) : this.state.gameSpeed
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

  handleGameStart() {
    this.state.game.start();

    let interval = setInterval(() => {
      this.state.game.moveDown();
    }, this.state.gameSpeed);

    this.setState({gameInterval: interval});
  }

  handleGamePause() {
    clearInterval(this.state.gameInterval);
    this.state.game.pause();
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
