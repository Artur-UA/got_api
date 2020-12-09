export default class GoT {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'; 
    }
    getResource = async (url) => { 
        const res = await fetch(`${this._apiBase}${url}`)

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json(); 
    }

    getAllCharac = async () => { 

        const res = await this.getResource("/characters?page=4&pageSize=10")
        return res.map(this._transformCharac)
    }
    
    getOneCharac = async (id) => {

        const character = await this.getResource(`/characters/${id}`)
        return this._transformCharac(character)
    }

    getBooks = async () => {
        return await this.getResource('/books')
    }

    getOneBook = async (number) =>{
        return await this.getResource(`/books/${number}`)
    }

    getHouses = async () => {
        return await this.getResource('/houses')
    }

    getOneHouse = async (name) => {
        return await this.getResource(`/houses/${name}`)
    }

    _transformCharac(char){
        return{
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: char.url
        }
    }
    
    _transformBook(book){
        return{
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released,
            authors: book.authors 
        }
    }

    _transformHouse(house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
        
}
