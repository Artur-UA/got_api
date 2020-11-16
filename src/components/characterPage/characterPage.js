import React, { Component } from "react";
import {Col, Row} from 'reactstrap'
import PersonDetails from '../personalDetails/personalDetails'
import ItemList from '../../components/itemList/itemList'
import ErrorMsg from '../errorMsg/index'
import GoT from '../services/got'

export default class CharacterPage extends Component {

    gotServ = new GoT(); 

    state = {
        selectedPerson: 130,
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
    
    render(){

        if (this.state.error) {
            return <ErrorMsg/>
        }

        return(
            <Row>
              <Col md='6'>
                  <ItemList onChareSelected={this.onSelectPerson}
                        getData = {this.gotServ.getAllCharac}
                  />
              </Col>
              <Col md='6'>
                  <PersonDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row>
        )
    }
}