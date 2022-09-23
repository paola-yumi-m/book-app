import React from "react";

export const Book = ({ book, setIsEditable, setCurrentBook }) => {
    let pagesRead = 0;

    function handleEditButton() {
        setIsEditable(true);
        setCurrentBook(book);
    }

    return (
        <div className='book-card'>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <div className='book-card-content'>
                <p className='book-info'>{book.pages} pages</p>
                <p className='book-info'>{book.year}</p>
                <p className='book-info'>Collection: {book.collection}</p>
                <p className='book-info'>{pagesRead} pages read | {100 * pagesRead / book.pages}% completed</p>
            </div>
            <div>
                <button id={book.title} className='buttons edit-button' onClick={handleEditButton}>Edit</button>
                <button className='buttons delete-button'>Delete</button>
            </div>
        </div>
    );
}