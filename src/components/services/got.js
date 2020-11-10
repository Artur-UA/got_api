export default class GoT {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'; // _ нижнее подчеркивание говорит другим разрабам что это статичные данные, их не нужно трогать
    }
    async getResource(url)  { 
        const res = await fetch(`${this._apiBase}${url}`)//добавит начало url и продолжение его 

        if(!res.ok) {//на случай если будет статус не 200(не ок) то покажет в консоли ошибку
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json(); //вернет полученый файл который из json формата конвертанет в обычный 
    }

    getAllCharac() {
        return this.getResource("/characters?page=3&pageSize=10")
    }
    getOneCharac(id) {
        return this.getResource(`/characters/${id}`)
    }

    getBooks(){
        return this.getResource('/books')
    }

    getOneBook(number){
        return this.getResource(`/books/${number}`)
    }

    getHouses(){
        return this.getResource('/houses')
    }

    getOneHouse(name){
        return this.getResource(`/houses/${name}`)
    }
}

const got = new GoT();


got.getAllCharac()
    .then((data) => console.log('OK', data))
    .then(res => res.forEach( item => console.log(item.name)))
    .catch(error => console.log(error))

got.getOneCharac(88)
    .then((data) => console.log('OK', data))
    .catch(error => console.log(error))
