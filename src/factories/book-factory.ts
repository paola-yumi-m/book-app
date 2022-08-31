class Book {
    private _title: string;
    private _author: string;
    private _pages: number;
    private _year: number;
    private _collection: string;

    constructor(title: string, author: string, pages: number, year: number, collection: string) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._year = year;
        this._collection = collection;
    }

    set collection(value: string) {
        this._collection = value;
    }
    set year(value: number) {
        this._year = value;
    }
    set pages(value: number) {
        this._pages = value;
    }
    set title(value: string) {
        this._title = value;
    }
    set author(value: string) {
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
    getBook(title: string, author: string, pages: number, year: number, collection: string) {
        return new Book(title, author, pages, year, collection);
    }
}