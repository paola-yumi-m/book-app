import React, {useState} from "react";
import './styles.css';
import {BookFactory} from "./factories/book-factory";
import {CollectionFactory} from "./factories/collection-factory";
import {Book} from "./Book";
import {Collections} from "./Collection";

export const App = () => {
    const bookFactory = new BookFactory();
    const collectionFactory = new CollectionFactory();

    function getBooksInitialState() {
        return [
            bookFactory.getBook(`Harry Potter and the Philosopher's Stone`, 'J. K. Rowling', 300, 1997, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 251, 1998, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Prisoner of Askaban', 'J. K. Rowling', 317, 1999, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Globet of Fire', 'J. K. Rowling', 636, 2000, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Order of The Phoenix', 'J. K. Rowling', 766, 2003, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Half Blood Prince', 'J. K. Rowling', 607, 2005, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Deathly Hollows', 'J. K. Rowling', 607, 2007, 'Harry Potter'),
        ];
    }

    const [ books ] = useState(getBooksInitialState());

    function getCollectionsInitialState() {
        return [
            collectionFactory.getCollection('Harry Potter', books)
        ];
    }

    const [ collections ] = useState(getCollectionsInitialState());

    const getBooks = () =>
        books.map((book, key) => <li className='list-item' key={key}><Book book={book} /></li>);

    const getCollections = () =>
        collections.map((collection, key) => <li key={key}><Collections collection={collection} /></li>);

    return (
        <div className='app'>
            <div className='header'>
                <h1>My Book App</h1>
            </div>
            <div className='body'>
                <div className='collections'>
                    <h2>Collections</h2>
                    <ul className='collections-list'>
                        {getCollections()}
                    </ul>
                </div>
                <div className='books'>
                    <h2>Books</h2>
                    <button className='add-book'>Add new book</button>
                    <ul className='book-list'>
                        {getBooks()}
                    </ul>
                </div>
            </div>
        </div>
);
}
