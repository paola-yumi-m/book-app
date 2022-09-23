import React, {useState} from "react";
import {CollectionFactory} from "./factories/collection-factory";
import {BookFactory} from "./factories/book-factory";

export const AddNewBookCard = ({ collections, books, setCollections, setAddNewBook, isEditable, setIsEditable, title,
                               setTitle, author, setAuthor, pages, setPages, year, setYear, selectedCollection, setSelectedCollection,
                                   newCollectionName, setNewCollectionName, currentBook, setCurrentBook }) => {
    const collectionFactory = new CollectionFactory();
    const bookFactory = new BookFactory();

    function getOptions() {
        return collections.map((collection, id) => collection.name === 'All' ?
            <option key={id} value='New Collection'>New Collection</option> :
            <option key={id} value={collection.name}>{collection.name}</option>);
    }

    function checkIfIsNew(collectionName) {
        const names = collections.map((collection) => collection.name);
        return !(names.includes(collectionName));

    }

    function handleSubmit(e) {
        e.preventDefault();
        const collectionName = selectedCollection === 'New Collection' ? newCollectionName : selectedCollection;
        const newBook = bookFactory.getBook(title, author, pages, year, collectionName);
        if (checkIfIsNew(collectionName)) {
            console.log('entrou')
            setCollections((prevState) => {
                const newCollections = prevState;
                newCollections.push(collectionFactory.getCollection(collectionName, [newBook]));
                return newCollections;
            });
        }
        else {
            setCollections((prevState) => {
                const editedCollection = [];
                prevState.map(collection => {
                    if (collection.name === collectionName) {
                        const collectionToEdit = collections.filter(collection => collection.name === collectionName)[0];
                        if (isEditable) {
                            books = collectionToEdit.books;
                            const editedBooks = books.map(book => book.id === currentBook ? newBook : book);
                            console.log(editedBooks);
                        } else {
                            collectionToEdit.addBook(newBook);
                            editedCollection.push(collectionToEdit);
                        }
                    } else {
                        editedCollection.push(collection);
                    }
                });
                return editedCollection;
            });
        }
        setCollections((prevState) => {
            const allBooks = [];
            prevState.forEach((collection) => {
                if (collection.name !== 'All') {
                    allBooks.push(...collection.books);
                }
            });
            const newAllCollection = collectionFactory.getCollection('All', allBooks);
            return collections.map((collection) => collection.name === 'All' ? newAllCollection : collection);
        });
        setAddNewBook(false);
        if (isEditable) setIsEditable(false);
    }

        function newCollection() {
        if (selectedCollection === 'New Collection') {
            return <div>
                <label htmlFor='collection-name'>Collection Name: </label>
                <input className='new-collection' type='text' id='collection-name' name='collection-name'
                       value={newCollectionName}
                       onChange={event => setNewCollectionName(event.target.value)}/>
            </div>
        }
    }

    return (
        <div className='new-book'>
            <form className='add-book-form'>
                <h3 className='form-title'>Add New Book</h3>
                <label htmlFor='title'>Title: </label>
                <input type='text' id='title' name='title' value={title} onChange={event => setTitle(event.target.value)} required/>
                <label htmlFor='author'>Author: </label>
                <input type='text' id='author' name='author' value={author} onChange={event => setAuthor(event.target.value)} required/>
                <label htmlFor='pages'>Pages: </label>
                <input type='text' id='pages' name='pages' value={pages} onChange={event => setPages(event.target.value)} required/>
                <label htmlFor='year'>Year: </label>
                <input type='text' id='year' name='year' value={year} onChange={event => setYear(event.target.value)} required/>
                <label htmlFor='collection'>Collection: </label>
                <select name='collection' id='collection' value={selectedCollection} onChange={event => setSelectedCollection(event.target.value)} required>
                    {getOptions()}
                </select>
                {newCollection()}
                <input className='buttons add-book submit-button' type='button' onClick={handleSubmit} value={isEditable ? 'Save' : 'Add'} />
            </form>
        </div>
    )
}
