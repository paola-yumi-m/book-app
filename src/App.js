import React, {useEffect, useState} from "react";
import './styles.css';
import {BookFactory} from "./factories/book-factory";

export const App = () => {
    const bookFactory = new BookFactory();
    const [ books ] = useState([
        bookFactory.getBook(`Harry Potter and the Philosopher's Stone`, 'J. K. Rowling', 300, 1997, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 251, 1998, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Prisoner of Askaban', 'J. K. Rowling', 317, 1999, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Globet of Fire', 'J. K. Rowling', 636, 2000, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Order of The Phoenix', 'J. K. Rowling', 766, 2003, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Half Blood Prince', 'J. K. Rowling', 607, 2005, 'Harry Potter'),
        bookFactory.getBook('Harry Potter and the Deathly Hollows', 'J. K. Rowling', 607, 2007, 'Harry Potter'),
    ]);
    const [ collections ] = useState(['Harry Potter']);

    useEffect(() => {
        const getBooks = () => {
            books.map((book, key) => console.log(book.title));
        }
        getBooks();
    }, []);

    return (
        <div className='app'>
            <div className='header'>
                <h1>My Book App</h1>
            </div>
            <div className='body'>
                <div className='collections'>
                    <h2>Collections</h2>
                </div>
                <div className='books'>
                    <h2>Books</h2>
                    <button className='add-book'>Add new book</button>
                    <ul className='book-list'>
                        <li className='list-item'>
                            <div className='book-card'>
                                <p>Book 1</p>
                                <p>Title</p>
                                <p>Author</p>
                                <p>Number of pages</p>
                                <p>% completed</p>
                                <p>Collection</p>
                                <button className='edit-button'>Editar</button>
                                <button className='delete-button'>Delete</button>
                            </div>
                        </li>
                        <li>
                            <div className='book-card'>
                                <p>Book 2</p>
                                <p>Title</p>
                                <p>Author</p>
                                <p>Number of pages</p>
                                <p>% completed</p>
                                <p>Collection</p>
                                <button className='edit-button'>Editar</button>
                                <button className='delete-button'>Delete</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
);
}
