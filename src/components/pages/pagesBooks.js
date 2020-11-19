import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ErrorMsg from '../errorMsg/index'
import ItemList from '../itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
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

    onSelectItem = (id) => { //установит id выбраного персонажа в selectedPerson
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
                onChareSelected={this.onSelectItem}
                getData = {this.gotServ.getBooks}
                renderItem = {(item) => (<>{item.name}</>)}
            />
        )
        
        const itemDetails = (
            <ItemDetails itemId={this.state.item}
                getData = {this.gotServ.getOneBook}
            >
                <Field field='name' label='Name'/> 
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher'/> 
                <Field field='released' label='Released'/> 
                <Field field='authors' label='Authors'/> 
                <Field field='url' label='ID'/> 
            </ItemDetails>
        )
        return(
            <RowBlock left={itemList}  right={itemDetails}/>
        )
    }
}
/* 

<Row> 
<Col md='6'>
    <ItemList onChareSelected={this.onSelectItem}
          getData = {this.gotServ.getHouses}
          renderItem = {(item) => (<><span>{item.name}</span><button>Click me</button></>)} //возьмет наш объект и вернет из него свойство name 
          />
</Col>
<Col md='6'>
    <ItemDetails personId={this.state.selectedPerson}/>
</Col>
</Row> */