import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import ItemList from './components/itemList/itemList'
import RandomChar from './../src/components/randomChar/randomChar'
import PersonDetails from './components/personalDetails/personalDetails'
import ErrorMsg from './components/errorMsg/index'



export default class App extends Component{
    state = {
        show: true,
        selectedPerson: 130, //при выборе(нажатии) персонажа он будет тут 
        error: false
    }

    componentDidCatch() { //если ошибка то изменит state.error : true 
        console.log('error');
        this.setState({
            error: true
        })
    }

    onSelectPerson = (id) => { //установит id выбраного персонажа в selectedPerson
      console.log(id);
        this.setState({
            selectedPerson: id
        })
    }

    render(){ //отвечает за кнопку, при нажатии показывает/скрывает лист со случайными персонажами

    /*  const Run = () => { //мой вариант 
        this.setState({
            show: !this.state.show
        })
    }; */

    const Run = () => {
        this.setState((state) => {
            return {
                show: !state.show
            }
        })
    }

    const randomWindow = this.state.show ? <RandomChar /> : null


    if(this.state.error) {
        return <ErrorMsg/>
    }

    
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

      <Container>
          <Row>
              <Col lg={{size: 5, offset: 0}}>
                    {randomWindow}
                    <button onClick={Run}><span>Toogle random character</span></button> 
              </Col>
          </Row>
          <Row>
              <Col md='6'>
                  <ItemList onChareSelected={this.onSelectPerson}/>
              </Col>
              <Col md='6'>
                  <PersonDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row>
      </Container>



      
    
    </div>
  );
}
}
