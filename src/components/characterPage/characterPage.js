import React, { Component } from "react";
import PersonDetails from '../personalDetails/personalDetails'
import ItemList from '../../components/itemList/itemList'
import ErrorMsg from '../errorMsg/index'
import GoT from '../services/got'
import RowBlock from '../rowBlock/rowBlock'

/* const RowBlock = ({left, right}) => { //создали новый класс, (компонент) и теперь сюда можно при его вызове передать два компонента, который отрисуется справа и слева. тоесть теперь можем вызвать этот компонент и в него передать любых два компонента в виде props. А сам RowBlock импортировать в других файлах  вынесли в отделный файл
    return(
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
    )
} */
export default class CharacterPage extends Component {

    gotServ = new GoT(); 

    state = {
        selectedPerson: 130,
        error: false
    }

    componentDidCatch() { //если ошибка то изменит state.error : true 
        console.log('error');
        this.setState({
            error: true
        })
    }

    onSelectPerson = (id) => { //установит id выбраного персонажа в selectedPerson
        console.log(id);
          this.setState({
              selectedPerson: id.replace(/[^\d]/g, '') //удалляю все кроме цифр 
          })
    }
    
    render(){

        if (this.state.error) {
            return <ErrorMsg/>
        }

        const itemList = ( //сделали миникомпонентом в render и потом передадим в return 
            <ItemList 
                onChareSelected={this.onSelectPerson}
                getData = {this.gotServ.getAllCharac}
                //renderItem = {(item) => `${item.name} (${item.gender})`} //возьмет наш объект и вернет из него свойство name 
                renderItem = {({name, gender}) => `${name} (${gender})`} //можно сразу item разложить на name и gender и не писать еще раз 
            />
        )

        const personalDetails = ( //сделали миникомпонентом в render и потом передадим в return 
            <PersonDetails personId={this.state.selectedPerson}/>
        )

        return(
/*             {/* <Row>  //было раньше, переписали на 3 отдельных не связаных компонента. (itemList, personalDetails, RowBlock) b чуть ниже их подключил
              <Col md='6'>
                  <ItemList 
                        onChareSelected={this.onSelectPerson}
                        getData = {this.gotServ.getAllCharac}
                        //renderItem = {(item) => `${item.name} (${item.gender})`} //возьмет наш объект и вернет из него свойство name 
                        renderItem = {({name, gender}) => `${name} (${gender})`} //можно сразу item разложить на name и gender и не писать еще раз 
                  />
              </Col>
              <Col md='6'>
                  <PersonDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row> } */

          <RowBlock left={itemList} right={personalDetails} />

          
        )
    }
}