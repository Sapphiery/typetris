import React, { Component } from "react";
import "./App.css";
import Wrapper from './components/Wrapper';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import GameContainer from './components/GameContainer';
import PreviewBlocks from './components/PreviewBlocks';
import Score from './components/Score';
import tetris from 'tetris-engine';
// import randomWord from 'random-word';

import "./assets/css/general.css";
import "./assets/js/script.js";
import $ from "jquery";

const Engine = tetris.Engine;
// console.log('Engine: ', Engine);

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
    currentShapeName: "",
    name: null,
    googleId: "",
    isLoggedIn: false,
    leaderboard: []
  }

  doLogin = (name, googleId) => {
    const post = {name: name, googleId: googleId, highScore: this.state.highScore};
    // console.log('in doLogin fn: ', post);
    let newState = {
      name: post.name,
      googleId: post.googleId,
      highScore: post.highScore
    }
    this.setState(newState);
    this.setState({ isLoggedIn: true })
    // console.log("LoggedIn should be true", this.state.isLoggedIn)
    fetch('/signin', {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
     body: JSON.stringify(post)
     }).then(function(res){
      return res.json();
     }).then(function (result) {
      // console.log(result);
     });
  }
  
  saveScore = (googleId, highScore) => {
    const post= {highScore: this.state.highScore, googleId: this.state.googleId}
    fetch('/updatehighscore/' + googleId, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(function(res){
      return res.json();
    }).then(function(result){
      // console.log("Saved your score", result)
    })
  }

  logout = () => {
    // console.log("Logout")
    const auth2 = window.gapi.auth2.getAuthInstance()
    // console.log("auth", auth2)
    if (auth2 != null) {
        auth2.signOut().then(
        auth2.disconnect().then(console.log("Logged out success!"))
        )
        this.setState({isLoggedIn: false})
    } else {
    console.log("failed to logout.")
    }
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
  
      if(this.state.currentShapeName !== gameState.shapeName && gameState.gameStatus === 1) {
        this.handleTypeTime();
        newState.gameSpeed--;
      }
      if (gameState.gameStatus === 3) {
        $(".restart").css("display", "block");
        this.saveScore();
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

    fetch('/leaderboard')
    .then(response => response.json())
    .then(leaderboard => (this.setState( {leaderboard }, () => {
      // console.log('Leaderboard', this.state.leaderboard)
    })));

    document.addEventListener("keydown", this.handleKeyPress);
    console.log("Hello, ", this.state.name)
    if (this.state.name == null) {
      this.setState({ isLoggedIn: false })
      // console.log("Login status should be false here", this.state.isLoggedIn)
    }
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

        $(".backDrop").addClass("incorrect");
        setTimeout(function() { 
          $(".backDrop").removeClass("incorrect"); 
        }, 300);
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
          doLogin={this.doLogin}
          logout={this.logout}
          isLoggedIn={this.state.isLoggedIn}
          name={this.state.name}
        />
        <Backdrop />
        <Score
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          leaderboard={this.state.leaderboard}
          />
        <GameContainer 
          row = {this.state.gameArea}
          start = {this.handleGameStart}
          restart = {this.handleRestart}
          currentword = {this.state.currentWord}
          correctletters = {this.state.correctLetters}
          leaderboard= {this.state.leaderboard}
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
