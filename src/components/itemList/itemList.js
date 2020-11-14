import React, {Component} from 'react'
import PackMan from '../loader';
import GoT from '../services/got';

export default class ItemList extends Component {

    gotServ = new GoT();

    state = {
        list : null
    }

    componentDidMount() { //запустится после отрисовки 
        this.gotServ.getAllCharac() //запрос на получене данных 
            .then((list) => { //обработка данных
                this.setState({
                    list
                })
            })
    }

    renderList(arrayData) { //отрендерит инфу. имена всех персонажей которые прищли с сервака 
        return arrayData.map((item, index) => {
            return(
                <li 
                    className="list-group-item" 
                    key={index}
                    //onClick={this.props.onChareSelected(index)}//для выбора персонажа 
                >
                    {item.name}
                </li>
            )
        })
    }

    render () {

        const {list} = this.state;

        if(!list) {
            return <PackMan/>
        }

        const showItem = this.renderList(list)

        return(
            <ul className='item-list list-group'>
                {showItem}
            </ul>
        )
    }
}