import {render, screen} from "@testing-library/react";
import {AddNewBookCard} from "../AddNewBookCard";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const mockSetCollections = jest.fn();
const mockSetIsEditable = jest.fn();
const mockSetAddNewBook = jest.fn();

describe('<AddNewBookCard />', function () {
    function renderAddNewBookCardComponent(selectedCollection, isEditable) {
        render(
            <AddNewBookCard
                collections={[{name: 'All'}, {name: 'Inspiring'}, {name: 'Harry Potter'}]}
                books={[]}
                setCollections={mockSetCollections}
                setAddNewBook={mockSetAddNewBook}
                isEditable={isEditable}
                setIsEditable={mockSetIsEditable}
                title={'Wonder'}
                setTitle={jest.fn()}
                author={'R J Palacio'}
                setAuthor={jest.fn()}
                pages={315}
                setPages={jest.fn()}
                year={2012}
                setYear={jest.fn()}
                selectedCollection={selectedCollection}
                setSelectedCollection={jest.fn()}
                newCollectionName={'Favorites'}
                setNewCollectionName={jest.fn()}
                currentBook={0}
                pagesRead={0}
                setPagesRead={jest.fn()}
            />
        );
    }

    it('should render new collection form when selected collection is New Collection', function () {
        renderAddNewBookCardComponent('New Collection', false);

        const newCollectionForm = screen.getByText('Collection Name:');

        expect(newCollectionForm).toBeInTheDocument();
    });

    it('should render Pages Read when editing the book info', function () {
        renderAddNewBookCardComponent('Inspiring', true);

        const pagesReadLabel = screen.getByText('Pages Read:');

        expect(pagesReadLabel).toBeInTheDocument();
    });

    it('should render select field when adding new book', function () {
        renderAddNewBookCardComponent('New Collection', false);

        const [ option1, option2, option3 ] = screen.getByRole('combobox').options;

        expect(option1.value).toBe('New Collection');
        expect(option2.value).toBe('Inspiring');
        expect(option3.value).toBe('Harry Potter');
    });

    it('should render Add button when isEditable is false', function () {
        renderAddNewBookCardComponent('New Collection', false);

        const addButton = screen.getByRole('button', { name: 'Add' });

        expect(addButton).toBeInTheDocument();
    });

    it('should render Save button when isEditable is true', function () {
        renderAddNewBookCardComponent('Inspiring', true);

        const saveButton = screen.getByRole('button', { name: 'Save' });

        expect(saveButton).toBeInTheDocument();
    });

    it('should call handleSubmit when Add button is clicked', function () {
        renderAddNewBookCardComponent('Inspiring', true);

        const saveButton = screen.getByRole('button', { name: 'Save' });
        userEvent.click(saveButton);

        expect(mockSetCollections).toBeCalledTimes(2);
        expect(mockSetAddNewBook).toBeCalledTimes(1);
        expect(mockSetIsEditable).toBeCalledTimes(1);
    });
});