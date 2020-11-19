import React, { Component } from 'react';
import GoT from '../services/got'
import ItemDetails, {Field} from '../itemDetails/itemDetails'


export default class DetailBook extends Component {
    
    gotServ = new GoT()


    render() {
            return(
                <ItemDetails itemId={this.props.bookId}
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
   }
}