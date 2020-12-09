import React, {Component} from 'react'
import GoT from './../services/got'
import PackMan from './../loader/index'
import ErrorMsg from '../errorMsg/index'
import './randomChar.css'

export default class RandomChar extends Component {

    gotServ = new GoT()

    state = {

        char: {}, 
        loading: true, 
        error: false 

    }

    onCharLoad = (char) => { 
        this.setState({
            char,
            loading: false
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
        const id = Math.floor(Math.random()*130 + 25); 
        this.gotServ.getOneCharac(id)
            .then(this.onCharLoad)
            .catch(this.onErr)
             
    }
    componentDidMount(){
        this.updateChar(); 
        this.timerId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount () {
        clearInterval(this.timerId)
    }

    render() {
        const {char, loading, error} = this.state

        const errMessage = error ? <ErrorMsg/> : null 
        const loader = loading? <PackMan/> : null
        const content = !(loading || error) ? <View chars = {char}/> : null 
        
        return(
            <div className="random-block rounded">
                {errMessage}
                {loader}
                {content}
            </div>
        )
    }
}

const View = ({chars}) => { 

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

