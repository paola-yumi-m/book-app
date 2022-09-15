import React, {useEffect, useState} from "react";
import './styles.css';
import {BookFactory} from "./factories/book-factory";
import {CollectionFactory} from "./factories/collection-factory";
import {Book} from "./Book";
import {Collections} from "./Collections";
import {AddNewBookCard} from "./AddNewBookCard";
import {logDOM} from "@testing-library/react";

export const App = () => {
    const bookFactory = new BookFactory();
    const collectionFactory = new CollectionFactory();
    const [ currentCollection, setCurrentCollection ] = useState(0);
    const [ addNewBook, setAddNewBook ] = useState(false);

    const harryPotter = [
            bookFactory.getBook(`Harry Potter and the Philosopher's Stone`, 'J. K. Rowling', 300, 1997, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 251, 1998, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Prisoner of Askaban', 'J. K. Rowling', 317, 1999, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Globet of Fire', 'J. K. Rowling', 636, 2000, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Order of The Phoenix', 'J. K. Rowling', 766, 2003, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Half Blood Prince', 'J. K. Rowling', 607, 2005, 'Harry Potter'),
            bookFactory.getBook('Harry Potter and the Deathly Hollows', 'J. K. Rowling', 607, 2007, 'Harry Potter'),
        ];

    const mazeRunner = [
        bookFactory.getBook('The Maze Runner', 'James Dashner', 375, 2009, 'Maze Runner'),
        bookFactory.getBook('The Scorch Trials', 'James Dashner', 361, 2010, 'Maze Runner'),
        bookFactory.getBook('The Death Cure', 'James Dashner', 325, 2011, 'Maze Runner'),
        bookFactory.getBook('The Kill Order', 'James Dashner', 384, 2012, 'Maze Runner'),
        bookFactory.getBook('The Fever Code', 'James Dashner', 347, 2016, 'Maze Runner'),
    ]

    function getCollectionsInitialState() {
        return [
            collectionFactory.getCollection('All', [...harryPotter, ...mazeRunner]),
            collectionFactory.getCollection('Harry Potter', harryPotter),
            collectionFactory.getCollection('Maze Runner', mazeRunner)
        ];
    }

    const [ collections, setCollections ] = useState(getCollectionsInitialState());

    useEffect(() => {}, [ currentCollection, collections ]);

    const getBooks = (collectionId) =>
        collections[collectionId].books.map((book, key) => <li className='book-list-item' key={key}><Book book={book} /></li>);

    const getCollections = () =>
        collections.map((collection, key) => <li key={key}><Collections collection={collection} id={key} setCollection={showCollection} /></li>);

    const showCollection = (id) => {
        setCurrentCollection(id);
        getBooks(id);
    }

    function handleAddNewBook() {
        setAddNewBook(true);
    }

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
                    <div className='books-header'>
                        <h2>Books</h2>
                        <button className='buttons add-book' onClick={handleAddNewBook}>Add new book</button>
                        {addNewBook ? <AddNewBookCard collections={collections} setCollections={setCollections} /> : <p></p>}
                    </div>
                    <ul className='book-list'>
                        {console.log(collections)}
                        {console.log(currentCollection)}
                        {getBooks(currentCollection)}
                    </ul>
                </div>
            </div>
        </div>
);
}
