import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import ItemList from './components/itemList/itemList' //перенес в characterPerson.js для того, чтобы в случае ошибки навесить там жизненный цикл для ошибки, чтобы не крашилось все приложение 
import RandomChar from './../src/components/randomChar/randomChar';
import PersonDetails from './components/personalDetails/personalDetails' //перенес в characterPerson.js для того, чтобы в случае ошибки навесить там жизненный цикл для ошибки, чтобы не крашилось все приложение //тут тоже осталось для показа книг и домов
import ErrorMsg from './components/errorMsg/index';
import CharacterPage from './components/characterPage';
import GoT from './components/services/got'




export default class App extends Component{
    gotServ = new GoT(); 

    state = {
        show: true,
        //selectedPerson: 130, //при выборе(нажатии) персонажа он будет тут  //перенес в characterPerson.js для того, чтобы в случае ошибки навесить там жизненный цикл для ошибки, чтобы не крашилось все приложение 
        error: false
    }

    componentDidCatch() { //если ошибка то изменит state.error : true 
        console.log('error');
        this.setState({
            error: true
        })
    }

 /*    onSelectPerson = (id) => { //установит id выбраного персонажа в selectedPerson  //перенес в characterPerson.js для того, чтобы в случае ошибки навесить там жизненный цикл для ошибки, чтобы не крашилось все приложение 
      console.log(id);
        this.setState({
            selectedPerson: id
        })
    } */

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

          {/*<Row> //перенес в characterPerson.js для того, чтобы в случае ошибки навесить там жизненный цикл для ошибки, чтобы не крашилось все приложение 
              <Col md='6'>
                  <ItemList onChareSelected={this.onSelectPerson}/>
              </Col>
              <Col md='6'>
                  <PersonDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row>*/}

          <CharacterPage/>

          <Row> 
              <Col md='6'>
                  <ItemList onChareSelected={this.onSelectPerson}
                        getData = {this.gotServ.getHouses}
                        renderItem = {(item) => (<><span>{item.name}</span><button>Click me</button></>)} //возьмет наш объект и вернет из него свойство name 
                        />
              </Col>
              <Col md='6'>
                  <PersonDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row>
          <Row> 
              <Col md='6'>
                  <ItemList onChareSelected={this.onSelectPerson}
                        getData = {this.gotServ.getBooks}
                        renderItem = {(item) => item.name} //возьмет наш объект и вернет из него свойство name 
                  />
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
