import React, {useState} from 'react'


function Test(){
    const [stats, setStats] = useState(7);
    const [reac, setReac] = useState([{name:'Peter', surname: 'Griffin'}])
console.log(stats);
console.log(reac);


    return (
        <>
            <button onClick= {() => setStats(stats + 1)}>click</button>
            <div>Прошло {stats} дней</div> 
            <button onClick={() => setReac(reac => ([...reac, {name:'Alan', surname: 'Patric'}]))}>name</button>
            {reac.map(item => {
                return(
                    <div>Name {item.name}, surname {item.surname}</div>
                )
            })}
            
        </>
    )
}

export default Test;