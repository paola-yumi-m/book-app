import React, {useState} from "react";

export const Book = ({ book, setAddNewBook }) => {
    const [ isEditable, setIsEditable ] = useState(false);

    let pagesRead = 0;

    function handleEditButton() {
        setIsEditable(true);
        setAddNewBook(true);

    }

    function handleSaveButton() {
        setIsEditable(false);
        setAddNewBook(false);
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
                {!isEditable ? <button className='buttons edit-button' onClick={handleEditButton}>Edit</button> :
                    <button className='buttons save-button' onClick={handleSaveButton}>Save</button>}
                <button className='buttons delete-button'>Delete</button>
            </div>
        </div>
    );
}