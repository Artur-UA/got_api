import React, { Component } from 'react'
import GoT from '../services/got'

const Field = ({char, field, label}) => { //это компонент в котором передана инфа как props и вот мі ее и используем char не может нам сразу прийти, так как когда создается компонент, он еще не пришел с сервера. тоесть задержка происходит  char это объект который мы примем с сервера
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span> 
            <span>{char[field]}</span>
        </li>
    )//label тянется из того файла, где мы его вызвали   char[field] так написан, потому-что из объекта который мы получаем, вытягиваем массив field(в нашем случае это то, что мы написали при вызове этого компонента в characterPage "gender")
}

export{
    Field
}
export default class PersonDetails extends Component {

    gotServ = new GoT(); 
    
    state = {
        char: null
    }

    componentDidMount(){//запустится сразу после render и подгрузит инфу 
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) { //если данные из app.js не совпадают с данными которые были до этого prevProps.personId
            this.updateChar()
        }
    }

    updateChar() { //personId это данные, которые передаются при вызове этого компонента из app.js
        const {personId} = this.props; //props это то что передано при вызове компонента 

        if (!personId) { //если нет ничего(тоесть если не нажатая клавиша то ничего не вернет)
            return;
        }

        const {getData} = this.props //приходят данные, в зависимости от того, кто запускает (подставляется разная функция, в зависимости от запускаемого компонента )

        //this.gotServ.getOneCharac(personId) 
        getData(personId)    
            .then((char) => { 
                this.setState({char})
            })                  
    }

    render() {

        if (!this.state.char){//если ничего не выбрано, будет показано
            return <span className='select-error'>Please select</span> 
        }

        const {char} = this.state;
        const {name} = char; ///* , gender, born, died, culture, id */элементы которые отключены, раньше прописывались из state? но теперь мы чтобы компонент подходил под всех и не нужно было лишнее писать, переделали его. и эти данные приходят непосредственно при вызове этоого компонента. тоесть под один компонент разные даннные, которые по себе не связаны, и чтобы не пересекались, сделано так 
 

        return(
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
{/*                     <li className="list-group-item d-flex justify-content-between">
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
                    </li> */}

                    {/* {this.props.children} компоненты которые были переданы в field в characterPage не отобразятся здесь, так как они переданы как что-то в виде props. пока не написать эту строку мы их не увидим. но из-за того что мы должны вытащить данные из сервера, а этот компонент загружается сразу и  не ждет ответа сервера, нужно написать по другому, как ниже написано */}

                    {
                        React.Children.map(this.props.children, (child) => {//child это по факту перебор всех children из props 
                            return React.cloneElement(child, {char})
                        }) //React.Children. это встроенный метод, чтобы перед рендером можно было произвести какие-то операции с детьми, в данном случае добавили map для их перебора ( первым будет то с чем мы работаем, второе что с ним будем делать ) в данном случае мы клонируем все элементы и добавляем каждому из них state, который мы к этому моменту уже получили и даем каждому и они рендерят подробно о каждом персонаже    в Return мы копировали каждого персонажа(так как мы не можем их изменять ) и уже копированому персонажу добавляем state {char} в котором подробная инфа о нем из сервера
                    }
                </ul>
            </div>
        );
    }
}