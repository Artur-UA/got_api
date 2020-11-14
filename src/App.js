import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemList from './components/itemList/itemList'
import RandomChar from './../src/components/randomChar/randomChar'




export default class App extends Component{
    state = {show: false}

    
render(){

  const Run = () => {
    this.setState({
        show: !this.state.show
    })
  };

  const randomWindow = this.state.show ? <RandomChar /> : null

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Project for test. 
        </p>
        <a
          className="App-link"
          href="https://github.com/Artur-UA"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub
        </a>
      </header>

      
      {randomWindow}
    <button onClick={Run}><span>Toogle random character</span></button>
    <ItemList/>
    </div>
  );
}
}
