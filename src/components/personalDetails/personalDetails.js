import React, { Component } from 'react'
import GoT from './../services/got'

export default class PersonDetails extends Component {

    gotServ = new GoT(); 
    
    state = {
        char: null
    }

    componentDidMount(){//запустится сразу после render и подгрузит инфу 
        this.updateChar()
    }

    updateChar() { //personId это данные, которые передаются при вызове этого компонента из app.js
        const {personId} = this.props; //props это то что передано при вызове компонента 

        if (!personId) { //если нет ничего(тоесть если не нажатая клавиша то ничего не вернет)
            return;
        }


        this.gotServ.getOneCharac(personId) //но если нажали на клавишу, покажем данные об этом персонаже
            .then((char) => { //меняет инфу 
                this.setState({char})
            })                  
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) { //если данные из app.js не совпадают с данными которые были до этого prevProps.personId
            this.updateChar()
        }
    }


    render() {

        if (!this.state.char){//если ничего не выбрано, будет показано
            return <span className='select-error'>Please select a person</span> 
        }
        const {name, gender, born, died, culture, id} = this.state.char;


        return(
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born || "no info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died || "no info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture || "no info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Id</span>
                        <span>{id}</span>
                    </li>
                </ul>
            </div>
        )
    }
}