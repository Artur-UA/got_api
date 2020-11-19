import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ErrorMsg from '../errorMsg/index'
import ItemList from '../itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
import GoT from '../services/got'

export default class PagesHouse extends Component {
    
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
        console.log(id.url);
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
                getData = {this.gotServ.getHouses}
                renderItem = {(item) => (<><span>{item.name}</span><button>Click me</button></>)}
            />
        )
        
        const itemDetails = (
            <ItemDetails itemId={this.state.item}
                getData = {this.gotServ.getOneHouse}
            >
                <Field field='name' label='Name'/> 
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/> 
                <Field field='titles' label='Titles'/> 
                <Field field='overlord' label='Overlord'/> 
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
                <Field field='url' label='ID'/> 
            </ItemDetails>
        )
        return(
            <RowBlock left={itemList}  right={itemDetails}/>
        )
    }
}
