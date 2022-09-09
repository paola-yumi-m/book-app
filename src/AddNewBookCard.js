import React from "react";

export const AddNewBookCard = () => {
    return (
        <div className='new-book'>
            <form className='add-book-form'>
                <h3 className='form-title'>Add New Book</h3>
                <label htmlFor='title'>Title: </label>
                <input type='text' id='title' name='title' required/>
                <label htmlFor='author'>Author: </label>
                <input type='text' id='author' name='author' required/>
                <label htmlFor='pages'>Pages: </label>
                <input type='number' id='pages' name='pages' required/>
                <label htmlFor='year'>Year: </label>
                <input type='number' id='year' name='year' required/>
                <label htmlFor='collection'>Collection: </label>
                <input type='text' id='collection' name='collection' required/>
                <input className='buttons add-book submit-button' type='submit'/>
            </form>
        </div>
    )
}
