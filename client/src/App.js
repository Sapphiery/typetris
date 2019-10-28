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
// import randomWord from 'random-word';

import "./assets/css/general.css";
import "./assets/js/script.js";

const wordList = ['captain', 'never', 'zombie', 'fever', 'cat', 'possum']

class App extends Component {
  state = {
    highScore: 0,
    currentScore: 0,
    gameArea: [],
    nextShape: {},
    gameStatus: 0,
    game: null,
    gameSpeed: 1000,
    typeTime: false,
    currentWord: "",
    correctLetters: 0
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

      if(this.state.nextShape !== gameState.nextShape) {
        this.handleTypeTime();
      }
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
    function timer(interval) {
      setTimeout(() => {
        this.state.game.moveDown();
        timer(this.state.gameSpeed);
      }, interval);
    }

    this.state.game.start();
    timer(this.state.gameSpeed);
  }

  handleGamePauseUnpause() {
    const PAUSE = 2;
    const ACTIVE = 1;
    if (this.state.gameStatus === ACTIVE){
      this.state.game.pause();
    } else if (this.state.gameStatus === PAUSE) {
      this.state.game.start();
    }
  }

  handleBlockMovement(key) {
    if (!this.state.typeTime) {
      switch (key) {
        case "ArrowUp":
          this.state.game.rotate();
          break;

        case "ArrowLeft":
          this.state.game.moveLeft();
          break;

        case "ArrowRight":
          this.state.game.moveRight();
          break;

        case "ArrowDown":
          this.state.game.moveDown();
          break;
      
        default:
          break;
      }
    }
  }

  handleKeyPress(event) {
    let key = event.code;

    if (key === "ArrowUp" || key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowDown") {
      this.handleBlockMovement(key);
    } else if (key === "Space") {
      this.handleGamePauseUnpause();
    } else {
      this.handleTyping(key);
    }
  }

  handleTyping(key) {
    if (this.state.typeTime) {
      let currentKey = key.startsWith("Key") ? key[3].toLowerCase() : "";
      let currentLetter = this.state.currentWord[this.state.correctLetters].toLowerCase();

      if (currentKey === currentLetter) {
        let numCorrect = this.state.correctLetters + 1;

        if (!this.state.currentWord[numCorrect]) {
          this.setState({typeTime: false, currentWord: "", correctLetters: 0});
        } else {
          this.setState({correctLetters: numCorrect});
        }
      } else {
        this.setState({typeTime: false, currentWord: "", correctLetters: 0, gameSpeed: this.state.gameSpeed - 50});
      }
    }
  }

  handleTypeTime() {
    let word = this.randomWord();
    
    this.setState({typeTime: true, currentWord: word, correctLetters: 0});
  }

  randomWord() {
    let index = Math.floor(Math.random() * wordList.length);

    return wordList[index];
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
