export const Collections = ({ collection, id, setCollection }) => {
    function handleClick(e) {
        const id = e.currentTarget.id;
        setCollection(id);
    }

    return (
        <div className='collection-card' onClick={handleClick} id={id}>
            <h3>{collection.name}</h3>
            <p>{collection.books.length > 1 ? `${collection.books.length} books` : `${collection.books.length} book`}</p>
        </div>
    );
}