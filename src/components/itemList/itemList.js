import React, {Component} from 'react'
import PackMan from '../loader';
//import GoT from '../services/got';

export default class ItemList extends Component {//компонент который будет рендерить 10 имен 

    //gotServ = new GoT(); сервис вызываем на уровень выше 

    state = {
        list : null
    }

    componentDidMount() { //запустится после отрисовки 

        const {getData} = this.props; //приходят данные, в зависимости от того, кто запускает (подставляется разная функция, в зависимости от запускаемого компонента )
        //this.gotServ.getAllCharac() //запрос на получене данных  // переписали, теперь вызываем из characterPage.js
        
        getData()// //вызываем в characterPage.js
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
                    /* key={(item.id.replace(/[^\d]/g, ''))}
                    onClick={() => this.props.onChareSelected((item.id.replace(/[^\d]/g, '')))}//для выбора персонажа  */
                    key={item.id}
                    onClick={() => this.props.onChareSelected(item.id)}//для выбора персонажа
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