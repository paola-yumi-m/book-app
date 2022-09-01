export const Collections = ({ collection }) => {
    return (
        <div className='collection-card'>
            <h3>{collection.name}</h3>
            <p>{collection.size} books</p>
        </div>
    );
}