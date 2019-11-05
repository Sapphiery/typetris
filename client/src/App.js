import React, { Component } from "react";
import "./App.css";
import Leaderboard from './components/Leaderboard';
import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import GameContainer from './components/GameContainer';
import PreviewBlocks from './components/PreviewBlocks';
import Score from './components/Score';
import tetris from 'tetris-engine';
import GoogleLogin from 'react-google-login';
// import randomWord from 'random-word';

import "./assets/css/general.css";
import "./assets/js/script.js";
import $ from "jquery";

const Engine = tetris.Engine;
console.log('Engine: ', Engine);

// const wordList = ['captain', 'never', 'zombie', 'fever', 'cat', 'possum']


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
    correctLetters: 0,
    currentShapeName: ""
  }

  makeNewGame =() => {

    let areaHeight = 20;
    let areaWidth = 25;
  
    let renderFunct = gameState => {
      let score = this.state.currentScore;
      let newScore = gameState.statistic.countLinesReduced;
      let newState = {
        currentScore: newScore,
        gameArea: gameState.body,
        nextShape: gameState.nextShape,
        gameStatus: gameState.gameStatus,
        gameSpeed: newScore > score ? this.state.gameSpeed - ((newScore - score) * 10) : this.state.gameSpeed,
        highScore: newScore > this.state.highScore ? newScore : this.state.highScore,
        currentShapeName: gameState.shapeName
      };
  
      if(this.state.currentShapeName !== gameState.shapeName) {
        this.handleTypeTime();
        newState.gameSpeed--;
      }
      if (gameState.gameStatus == 3) {
        $(".restart").css("display", "block");
      }
      this.setState(newState);
    }
  
    const game = new Engine(
      areaHeight,
      areaWidth,
      renderFunct
    );

    return game;
  };
  
  componentDidMount() {

    // console.log('game is: ', game);

    this.setState({ game: this.makeNewGame() }, () => {
      // console.log("State changed.")
      // console.log(this.state.game)
    });
    // console.log('State: ', this.state);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleGameStart = () => {
    this.state.game.start();
    // setInterval(() => {
    //   this.state.game.moveDown();
    //   // timer(this.state.gameSpeed);
    // }, 1000);

    let tick = () => {
      this.state.game.moveDown();
      // console.log("tick " + this.state.gameSpeed);
      if (this.state.gameStatus !== 3) setTimeout(tick, this.state.gameSpeed > 0 ? this.state.gameSpeed : 1);
    };

    setTimeout(tick, this.state.gameSpeed);
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

  handleBlockMovement = (key) => {
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

  handleKeyPress = (event) => {
    let key = event.code;
    // console.log(key);
    event.preventDefault();

    if (key === "ArrowUp" || key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowDown") {
      this.handleBlockMovement(key);
    } else if (key === "Space") {
      this.handleGamePauseUnpause();
    } else {
      this.handleTyping(key);
    }
  }

  handleTyping = (key) => {
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
        this.setState({typeTime: false, currentWord: "", correctLetters: 0, gameSpeed: this.state.gameSpeed - 100});
        console.log("INCORRECT!")
        $(".backDrop").addClass("incorrect");
        setTimeout(function(){ $(".backDrop").removeClass("incorrect"); }, 300);
      }
    }
  }

  handleTypeTime() {
    $.get('/api/randomword', data => {
      let word = data.word;

      this.setState({typeTime: true, currentWord: word, correctLetters: 0});
    });
  }

  handleRestart = () => {
    this.setState({game: this.makeNewGame(), currentScore: 0, gameSpeed: 1000, gameStatus: 0});
    $(".start").css("display", "block");
  };

  // randomWord() {
  //   let index = Math.floor(Math.random() * wordList.length);

  //   return wordList[index];
  // }

  render() {
    return (
      <Wrapper >
        <Navbar 
        />
        <Backdrop />
        <Score 
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          // leaderboard={}
          />
        <GameContainer 
          row = {this.state.gameArea}
          start = {this.handleGameStart}
          restart = {this.handleRestart}
          currentword = {this.state.currentWord}
          correctletters = {this.state.correctLetters}
        >
        </GameContainer>
        <PreviewBlocks 
          NextBlock = {this.state.nextShape}
        />  
      </Wrapper>
    );
  }
}

export default App;
