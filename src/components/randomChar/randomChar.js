import React, {Component} from 'react'
import GoT from './../services/got'

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar(); //как только будет создан RandomChar у него будет вызван этот метод которыйотрисует рандомного персонажа
    }
    gotServ = new GoT()

    state = {
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null,
        id: null
    }

    updateChar() {
        const id = Math.floor(Math.random()*130 + 25); //Math.floor округляет/  *130 + 25 //от 25 до 145 номер
        this.gotServ.getOneCharac(id)//вытаскивваем из компонента got метод getOneCharac
            .then(char => this.setState({ //меняем state из пустого на что-то 
                name: char.name,
                gender: char.gender,
                born: char.born,
                died: char.died,
                culture: char.culture,
                id: char.url
            }))
    }

    render() {
        const {name, gender, born, died, culture, id} = this.state

        return(
            <div className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className='list-group list-group-flush'>
                    <li className="list-group-item d-flex justify-content-beetween">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-beetween">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-beetween">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-beetween">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-beetween">
                        <span className="term">Id</span>
                        <span>{id}</span>
                    </li>
                </ul>
            </div>
        )
    }
}