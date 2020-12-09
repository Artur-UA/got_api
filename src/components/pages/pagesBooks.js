import React, { Component } from 'react';

import ErrorMsg from '../errorMsg/index'
import ItemList from '../itemList/itemList'

import GoT from '../services/got'
import {withRouter} from 'react-router-dom'

class PagesBooks extends Component {
    
    gotServ = new GoT()

    state = {
        error: false,
        
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error : true
        })
    }



    render(){
        if(this.state.error){
            return <ErrorMsg/>
        }

        return(
 
            <ItemList 
                onChareSelected={(itemId) => { 
                    const id = itemId.url.replace(/[^\d]/g, '')
                    this.props.history.push(`/books/${id}`)
                }} 
                getData = {this.gotServ.getBooks}
                renderItem = {(item) => (<>{item.name}</>)}
            />

        )
    }
}


export default withRouter(PagesBooks)