import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ErrorMsg from '../errorMsg/index'
import ItemList from '../itemList/itemList'
import PersonDetails, {Field} from '../personalDetails/personalDetails'
import GoT from '../services/got'

export default class PagesBooks extends Component {
    
    gotServ = new GoT()

    state = {
        error: false,
        item: 4
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error : true
        })
    }

    onSelectPerson = (id) => { //установит id выбраного персонажа в selectedPerson
        console.log(id);
          this.setState({
              item: id.url.replace(/[^\d]/g, '') //удалляю все кроме цифр 
          })
    }

    render(){
        if(this.state.error){
            return <ErrorMsg/>
        }

        const itemList = (
            <ItemList 
                onChareSelected={this.onSelectPerson}
                getData = {this.gotServ.getBooks}
                renderItem = {(item) => (<>{item.name}</>)}
            />
        )
        
        const personalDetails = (
            <PersonDetails personId={this.state.item}
                getData = {this.gotServ.getOneBook}
            >
                <Field field='name' label='Name'/> 
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher'/> 
                <Field field='released' label='Released'/> 
                <Field field='authors' label='Authors'/> 
                <Field field='url' label='ID'/> 
            </PersonDetails>
        )
        return(
            <RowBlock left={itemList}  right={personalDetails}/>
        )
    }
}
/* 

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
</Row> */