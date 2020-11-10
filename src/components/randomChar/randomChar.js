import React, {Component} from 'react'
import GoT from './../services/got'

export default class RandomChar extends Component {

    gotServ = new GoT()

    state = {
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null
    }

    updateChar() {
        const id = 134;
        this.gotServ.getOneCharac(id)
            .then(char => this.setState({
                name: char.name,
                gender: char.gender,
                born: char.born,
                died: char.died,
                culture: char.culture
            }))
    }

    render() {
        const {name, gender, born, died, culture} = this.state

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
                </ul>
            </div>
        )
    }
}