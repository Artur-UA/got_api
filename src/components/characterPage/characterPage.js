import React, { Component } from "react";
import ItemList from '../../components/itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
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

    onSelectItem = (id) => { //установит id выбраного персонажа в selectedPerson
        console.log(id.id);
        console.log(id.id.replace(/[^\d]/g, ''));
          this.setState({
              selectedPerson: id.id.replace(/[^\d]/g, '') //удалляю все кроме цифр 
          })
    }
    
    render(){

        if (this.state.error) {
            return <ErrorMsg/>
        }

        const itemList = ( //сделали миникомпонентом в render и потом передадим в return 
            <ItemList 
                onChareSelected={this.onSelectItem}
                getData = {this.gotServ.getAllCharac}
                //renderItem = {(item) => `${item.name} (${item.gender})`} //возьмет наш объект и вернет из него свойство name 
                renderItem = {({name, gender}) => `${name} (${gender})`} //можно сразу item разложить на name и gender и не писать еще раз 
            />
        )

        const itemDetails = ( //сделали миникомпонентом в render и потом передадим в return <      строка   Field field='gender' label='Gender'/> * так они не отрисуются, для этого нужно в компоненте нижнего порядка написать {this.props.children} но и так тоже будет виден только gender  Gender  так как инфа на момент отрисовки не успеет прити с сервера 
            <ItemDetails itemId={this.state.selectedPerson}
                    getData = {this.gotServ.getOneCharac}
            >
                    <Field field='gender' label='Gender'/> 
                    <Field field='born' label='Born'/>
                    <Field field='died' label='Died'/> 
                    <Field field='culture' label='Culture'/> 
                    <Field field='id' label='ID'/> 
            </ItemDetails>
        )

        return(
/*             {/* <Row>  //было раньше, переписали на 3 отдельных не связаных компонента. (itemList, itemDetails, RowBlock) b чуть ниже их подключил
              <Col md='6'>
                  <ItemList 
                        onChareSelected={this.onSelectItem}
                        getData = {this.gotServ.getAllCharac}
                        //renderItem = {(item) => `${item.name} (${item.gender})`} //возьмет наш объект и вернет из него свойство name 
                        renderItem = {({name, gender}) => `${name} (${gender})`} //можно сразу item разложить на name и gender и не писать еще раз 
                  />
              </Col>
              <Col md='6'>
                  <ItemDetails personId={this.state.selectedPerson}/>
              </Col>
          </Row> } */

          <RowBlock left={itemList} right={itemDetails} />

          
        )
    }
}