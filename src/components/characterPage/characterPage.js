import React, { Component } from "react";
import ItemList from '../../components/itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
import ErrorMsg from '../errorMsg/index'
import GoT from '../services/got'
import RowBlock from '../rowBlock/rowBlock'

export default class CharacterPage extends Component {

    gotServ = new GoT(); 

    state = {
        selectedPerson: 130,
        error: false
    }

    componentDidCatch() { 
        console.log('error');
        this.setState({
            error: true
        })
    }

    onSelectItem = (id) => { 
        console.log(id.id);
        console.log(id.id.replace(/[^\d]/g, ''));
          this.setState({
              selectedPerson: id.id.replace(/[^\d]/g, '') 
          })
    }
    
    render(){

        if (this.state.error) {
            return <ErrorMsg/>
        }

        const itemList = ( 
            <ItemList 
                onChareSelected={this.onSelectItem}
                getData = {this.gotServ.getAllCharac}
                renderItem = {({name, gender}) => `${name} (${gender})`} 
            />
        )

        const itemDetails = ( 
            <ItemDetails itemId={this.state.selectedPerson}
                    getData = {this.gotServ.getOneCharac}
            >
                    <Field field='gender' label='Gender'/> 
                    <Field field='born' label='Born'/>
                    <Field field='died' label='Died'/> 
                    <Field field='culture' label='Culture'/> 
                    <Field field='id' label='ID'/> 
            </ItemDetails>
        )

        return(

          <RowBlock left={itemList} right={itemDetails} />

          
        )
    }
}