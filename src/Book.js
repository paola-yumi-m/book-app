import React from "react";

export const Book = ({book}) => {
    let pagesRead = 0;
    return (
        <div className='book-card'>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.pages} pages</p>
            <p>{book.year}</p>
            <p>Collection: {book.collection}</p>
            <p>{pagesRead} pages read | {100 * pagesRead / book.pages}% completed</p>
            <button className='edit-button'>Edit</button>
            <button className='delete-button'>Delete</button>
        </div>
    );
}