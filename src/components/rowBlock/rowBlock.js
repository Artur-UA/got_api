import React from "react";
import {Col, Row} from 'reactstrap'


const RowBlock = ({left, right}) => { //создали новый класс, (компонент) и теперь сюда можно при его вызове передать два компонента, который отрисуется справа и слева. тоесть теперь можем вызвать этот компонент и в него передать любых два компонента в виде props. А сам RowBlock импортировать в других файлах
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
}

export default RowBlock