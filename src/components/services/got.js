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

    async getAllCharac() { //так как мы ждем ответ от сервера, нужно применить async/await потому что мы  должны дождаться ответа от сервера, а потом этот ответ записать в state 
        //старый вариант 
        //return this.getResource("/characters?page=3&pageSize=10")

        const res = await this.getResource("/characters?page=3&pageSize=10")//получаем массив из сервера с данными 
        return res.map(this._transformCharac)//результат который получили, перебираем его при помощи map (внутрь его передается callback функция ( в нашем случае _transformCharac))
    }
    async getOneCharac(id) {

        const character = await this.getResource(`/characters/${id}`)//вытаскиеваем описание одного персонажа
        return this._transformCharac(character)//в этот метод просто добавляем персонажа, и его там разложат 
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

    _transformCharac(char){//метод чтобы доставать параметры из сервера и подставлять ее в state вместо null 
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

/* const got = new GoT();


got.getAllCharac()
    .then((data) => console.log('OK', data))
    .then(res => res.forEach( item => console.log(item.name)))
    .catch(error => console.log(error))

got.getOneCharac(88)
    .then((data) => console.log('OK', data))
    .catch(error => console.log(error))
 */