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
        return arrayData.map((item) => {
            
            const {id} = item //вытаскиеваем id, по факту item.id 
            const label = this.props.renderItem(item) //функция из компонента characterPage item по факту это наш объект который приходит с сервера(тоесть все там вместе url, name died и так далее)

            return(
                <li 
                    className="list-group-item" 
                    /* key={(item.id.replace(/[^\d]/g, ''))}  //вылетало из-за того что не стрелочная функция(теряло контекст вызова )
                    onClick={() => this.props.onChareSelected((item.id.replace(/[^\d]/g, '')))}//для выбора персонажа  */
                    key={id}//item.id по факту
                    onClick={() => this.props.onChareSelected(item.id)}//для выбора персонажа
                >
                    { /*{item.name}  после того как написал код, теперь вместо этого label */} 
                    {label}
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