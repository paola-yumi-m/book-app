import React, {useState} from "react";

export const AddNewBookCard = ({ collections, setCollection, collectionFactory }) => {
    const [ title, setTitle ] = useState("");
    const [ author, setAuthor ] = useState("");
    const [ pages, setPages ] = useState("");
    const [ year, setYear ] = useState("");
    const [ collectionName, setCollectionName ] = useState("");

    function getOptions() {
        return collections.map((collection, id) => collection.name === 'All' ?
            <option key={id} value='new'>New Collection</option> :
            <option key={id} value={collection.name}>{collection.name}</option>);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log();
        if (e.target.collection === 'new') {

        }
        // setCollection(() =>
        //     [...collections,
        //     collectionFactory.getCollection(e.target.title, )]
        // )
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
                <select name='collection' id='collection' onChange={event => setCollectionName(event.target.value)} required>
                    {getOptions()}
                </select>
                <input className='buttons add-book submit-button' type='button' onClick={handleSubmit} value='Add' />
            </form>
        </div>
    )
}
