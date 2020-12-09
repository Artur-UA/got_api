import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import RandomChar from './../src/components/randomChar/randomChar';
import ErrorMsg from './components/errorMsg/index';
import CharacterPage from './components/characterPage';
import GoT from './components/services/got'
import {PagesBooks, PagesHouse, DetailBook} from './components/pages'
import {Route, Switch, Redirect} from 'react-router-dom'
import Navbars from './components/navBar/navbar'


export default class App extends Component{
    gotServ = new GoT(); 

    state = {
        show: true,
        error: false
    }

    componentDidCatch() { 
        console.log('error');
        this.setState({
            error: true
        })
    }


    render(){ 

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
        <div className='headers'>
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
        </div>
        <div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
       {/*  <Test/> */}
        <Navbars/>

      <div className='bg'>
        <Container >
            <div className="bg-component">
                <Row className='random-window'>
                    <Col lg={{size: 6, offset: 3}}>
                            {randomWindow}
                            <button className='button-grey'onClick={Run}><span>Toogle random character</span></button> 
                    </Col>
                </Row>

                <Switch>
                    <Route path='/person' component={CharacterPage} />
                    <Route path='/house' component={PagesHouse} />
                    <Route path='/books' exact component={PagesBooks} />
                    <Route path='/books/:id'  render={
                        ({match}) => {
                            const {id} = match.params;

                            return <DetailBook bookId = {id}/> } 
                    }/>
                    <Redirect to='/' />
                </Switch>
            </div>
        </Container>
      </div>


    </div>
  );
}
}
