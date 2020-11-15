import React, {Component} from 'react'
import GoT from './../services/got'
import PackMan from './../loader/index'
import ErrorMsg from '../errorMsg/index'
import './randomChar.css'

export default class RandomChar extends Component {

    gotServ = new GoT()

    state = {

        char: {}, //пустой объект в state, потом мы его заполним данными. тоесть объект в объекте получится 
        loading: true, //для загрузчика 
        error: false //для ошибок, изначально false 

/*         name: null, //было раньше 
        gender: null,
        born: null,
        died: null,
        culture: null,
        id: null */
    }

    onCharLoad = (char) => { //функция, которая запускает обновление state 
        this.setState({
            char,
            loading: false//если загрузится, то уберет loader 
        })
    }

    onErr = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        console.log("hi");
        const id = Math.floor(Math.random()*130 + 25); //Math.floor округляет/  *130 + 25 //от 25 до 145 номер
        //const id = 13333333//проверка error 
        this.gotServ.getOneCharac(id)//вытаскивваем из компонента got метод getOneCharac
            .then(this.onCharLoad)//запустим стрелочную функцию, 
                /*.then(char => this.setState({ //меняем state из пустого на что-то */
            .catch(this.onErr)//если ошибка изменит state благодаря функции(onErr) 
               
               /*char //char это объект пустой, который благодаря мутоду в got.js запишет новые значения
                 name: char.name,  //переписали функции в got.js поэтому уже тут не нужно 
                gender: char.gender,
                born: char.born,
                died: char.died,
                culture: char.culture,
                id: char.url 
            }))*/
    }
    componentDidMount(){
        this.updateChar(); //как только будет создан RandomChar у него будет вызван этот метод которыйотрисует рандомного персонажа
        this.timerId = setInterval(this.updateChar, 3000)//обновляем каждые 3 сек рандомного персонажа
    }

    componentWillUnmount () {
        clearInterval(this.timerId)
    }

    render() {
        const {char, loading, error} = this.state //после того как переписали, у нас получилось объект ключ char а значение еще один объект с данными, и чтобы их вытащить, нужно было сделать так 

        const errMessage = error ? <ErrorMsg/> : null //если ошибка будет(не пришел ответ от сервера или что-то нне так), благодаря catch мы ее поймаем и обработаем ошибк, а именно переведем в state параметр error: true/ а это в свою очередь при рендере загрузит сообщение что произошла ошибка 
        const loader = loading? <PackMan/> : null//сделали конст, если loading true то бьудет PackMan, если нет то будет отображатся View в котором покажет даные с сервера. Это сделано чтобы и PackMan и View находились в одном контейнере. 
        const content = !(loading || error) ? <View chars = {char}/> : null //!(loading || error) если loading и error нету, то false. но так как стоит ! будет true/ а если что-то из них есть, то будет true на все выражение и оно из-за ! трансформируется в false 
        
        
        return(
            <div className="random-block rounded">
                {errMessage}
                {loader} {/*вставили конст loader */}
                {content}
            </div>
        )
    }
}

const View = ({chars}) => { //сделали отдельно рендер данных.

    const {name, gender, born, died, culture, id} = chars;
    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className='list-group list-group-flush'>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender || "No info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born || "No info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died || "No info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture || "No info"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Id</span>
                        <span>{id}</span>
                    </li>
                </ul>
        </>
    )
}

