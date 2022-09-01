export class Collection {
    constructor(name, books) {
        this._name = name;
        this._books = books;
        this._size = books.length;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get books() {
        return this._books;
    }

    set books(value) {
        this._books = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    addBook(book) {
        this._books.push(book);
    }
}

export class CollectionFactory {
    getCollection(name, books) {
        return new Collection(name, books.length);
    }
}