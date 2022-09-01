export class Book {
    constructor(title, author, pages, year, collection) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._year = year;
        this._collection = collection;
    }

    set collection(value) {
        this._collection = value;
    }
    set year(value) {
        this._year = value;
    }
    set pages(value) {
        this._pages = value;
    }
    set title(value) {
        this._title = value;
    }
    set author(value) {
        this._author = value;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

    get year() {
        return this._year;
    }

    get collection() {
        return this._collection;
    }
}

export class BookFactory {
    getBook(title, author, pages, year, collection) {
        return new Book(title, author, pages, year, collection);
    }
}