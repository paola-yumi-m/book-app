import React from "react";

export const Collections = ({ collection, id, setCollection, setCollections }) => {
    function handleClick(e) {
        const id = e.currentTarget.id;
        setCollection(id);
    }

    function handleDelete(e) {
        const id = e.target.id;
        setCollections(prevState => prevState.filter(collection => collection.name !== id));
        setCollections(prevState => {
            const editedCollection = [];
            prevState.map(collection => {
            if (collection.name === 'All') {
                collection.books = collection.books.filter(book => book.collection !== id);
                    editedCollection.push(collection);
                } else {
                editedCollection.push(collection);
            }})
        return editedCollection});

    }

    return (
        <div>
            <div className='collection-card' onClick={handleClick} id={id}>
                <h3>{collection.name}</h3>
                <p>{collection.books.length > 1 ? `${collection.books.length} books` : `${collection.books.length} book`}</p>
            </div>
            <div className='collection-button'>
                {collection.name !== 'All' ? <button className='buttons collection-button' onClick={handleDelete} id={collection.name}>Delete</button> : <p></p>}
            </div>
        </div>
    );
}