import React from "react";
import './styles.css';

export const App = () => {
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
