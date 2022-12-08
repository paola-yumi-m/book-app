import React from "react";

export const Book = ({ book, setIsEditable, setTitle, setAuthor, setPages, setYear,
                         setNewCollectionName, setSelectedCollection, setCurrentBook,
                     setCollections, setPagesRead}) => {
    function handleEditButton() {
        setIsEditable(true);
        setTitle(book.title);
        setAuthor(book.author);
        setPages(book.pages);
        setYear(book.year);
        setNewCollectionName('');
        setCurrentBook(book.id);
        setSelectedCollection(book.collection);
        setPagesRead(book.pagesRead);
    }

    function handleDelete() {
        const id = book.id;
        let editedBooks;
        setCollections(prevState => {
            const editedCollection = [];
            prevState.map(collection => {
                if (collection.name === 'All') {
                    editedBooks = collection.books.filter(book => book.id !== id);
                    collection.books = editedBooks;
                    editedCollection.push(collection);
                } else if (collection.name === book.collection) {
                    editedBooks = collection.books.filter(book => book.id !== id);
                    collection.books = editedBooks;
                    editedCollection.push(collection)
                } else {
                    editedCollection.push(collection);
                }
            });
            return editedCollection;
        })
    }

    return (
        <div data-testid='books' className='book-card'>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <div className='book-card-content'>
                <p className='book-info'>{book.pages} pages</p>
                <p className='book-info'>{book.year}</p>
                <p className='book-info'>Collection: {book.collection}</p>
                <p className='book-info'>{book.pagesRead} pages read | {Math.ceil(100 * book.pagesRead / book.pages)}% completed</p>
            </div>
            <div>
                <button id={book.title} className='buttons edit-button' onClick={handleEditButton}>Edit</button>
                <button className='buttons delete-button' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}