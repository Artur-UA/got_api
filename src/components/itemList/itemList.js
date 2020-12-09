import React, {/* Component */useState, useEffect} from 'react'
import PackMan from '../loader';


function ItemList({getData, renderItem, onChareSelected}){ 
    const [list, updateList] = useState([])

    useEffect(() => {
        getData()
            .then((data) => { 
                updateList(data) 
            })     
    })


    function renderList(arrayData) { 
        return arrayData.map((item) => {
            const {id} = item 
            
            const label = renderItem(item) 

            return(
                <li 
                    className="list-group-item" 
                    key={id}
                    onClick={() => onChareSelected(item)}
                >

                    {label}
                </li>
            )
        })
    }

        if(!list) {
            return <PackMan/>
        }

 
        const showItem = renderList(list)


        return(
            <ul className='item-list list-group bg-books'>
                {showItem}
            </ul>
        )
    //}
}

export default ItemList;