export class Book {
    static counter = 0;

    constructor(title, author, pages, year, collection) {
        this._id = ++Book.counter;
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._year = year;
        this._collection = collection;
        this._pagesRead = 0;
    }

    set id(value) {
        this._id = value;
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
    set pagesRead(value) {
        this._pagesRead = value;
    }

    get id() {
        return this._id;
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

    get pagesRead() {
        return this._pagesRead;
    }
}

export class BookFactory {
    getBook(title, author, pages, year, collection) {
        return new Book(title, author, pages, year, collection);
    }
}