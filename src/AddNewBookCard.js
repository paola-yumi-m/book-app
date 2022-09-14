import React, {useState} from "react";
import {CollectionFactory} from "./factories/collection-factory";
import {BookFactory} from "./factories/book-factory";
import {Collection} from "./factories/collection-factory";

export const AddNewBookCard = ({ collections, setCollection }) => {
    const [ title, setTitle ] = useState("");
    const [ author, setAuthor ] = useState("");
    const [ pages, setPages ] = useState("");
    const [ year, setYear ] = useState("");
    const [ collectionName, setCollectionName ] = useState("New Collection");
    const collectionFactory = new CollectionFactory();
    const bookFactory = new BookFactory();
    const collection = new Collection('oi', []);
    console.log(collection.name);

    function getOptions() {
        return collections.map((collection, id) => collection.name === 'All' ?
            <option key={id} value='New Collection'>New Collection</option> :
            <option key={id} value={collection.name}>{collection.name}</option>);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newBook = bookFactory.getBook(title, author, pages, year, collectionName);
        if (collectionName === 'New Collection') {
            const newCollection = collectionFactory.getCollection(collectionName, [newBook]);
            setCollection(() =>
                [...collections,
                    newCollection]
            )
        }
        else {
            const collectionToEdit = collections.filter(collection => collection.name === collectionName);
            console.log(collectionToEdit);
            collectionToEdit.addBook();
            console.log(collectionToEdit);
            setCollection(() =>
                [...collections,
                collectionToEdit])
        }
    }

    function newCollection() {
        if (collectionName === 'New Collection') {
            return <div>
                    <label htmlFor='collection-name'>Collection Name: </label>
                    <input className='new-collection' type='text' id='collection-name' name='collection-name' value={collectionName}
                       onChange={event => setCollectionName(event.target.value)} />
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
                <select name='collection' id='collection' value={collectionName} onChange={event => setCollectionName(event.target.value)} required>
                    {getOptions()}
                </select>
                {newCollection()}
                <input className='buttons add-book submit-button' type='button' onClick={handleSubmit} value='Add' />
            </form>
        </div>
    )
}
