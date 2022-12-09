import {fireEvent, prettyDOM, render, screen, within} from "@testing-library/react";
import {App} from "../App";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

function getByRoleButton(buttonName) {
    return screen.getByRole('button', {name: buttonName});
}

describe('<App />', function () {
    it('should render all collections', function () {
        render(
          <App />
        );

        const collectionAll = screen.getByText('All');
        const collectionHarryPotter = screen.getByText('Harry Potter');
        const collectionMazeRunner = screen.getByText('Maze Runner');

        expect(collectionAll).toBeInTheDocument();
        expect(collectionHarryPotter).toBeInTheDocument();
        expect(collectionMazeRunner).toBeInTheDocument();
    });

    it('should render number of books of each collection', function () {
        render(
            <App />
        );

        const [ numberOfBooksAll, numberOfBooksHarryPotter, numberOfBooksMazeRunner ] =
            screen.getAllByText(/book/);

        expect(numberOfBooksAll.innerHTML).toBe('12 books');
        expect(numberOfBooksHarryPotter.innerHTML).toBe('7 books');
        expect(numberOfBooksMazeRunner.innerHTML).toBe('5 books');
    });

    it('should show all books when clicking on collection All', function () {
        render(
            <App />
        );

        const collectionAllCard = screen.getAllByTestId('collections');
        userEvent.click(collectionAllCard[0]);
        const books = screen.getAllByTestId('books');

        expect(books.length).toBe(12);
    });

    it('should show collection books when clicking on given collection', function () {
        render(
            <App />
        );

        const collectionsCards = screen.getAllByTestId('collections');

        const collectionHarryPotterCard = collectionsCards[1];
        userEvent.click(collectionHarryPotterCard);
        const harryPotterBooks = screen.getAllByTestId('books');

        const collectionMazeRunnerCard = collectionsCards[2];
        userEvent.click(collectionMazeRunnerCard);
        const mazeRunnerBooks = screen.getAllByTestId('books');

        expect(harryPotterBooks.length).toBe(7);
        expect(mazeRunnerBooks.length).toBe(5);
    });

    it('should delete collection when clicking on Delete button', function () {
        render(
            <App />
        );

        const deleteCollectionButtons = screen.getAllByText('Delete Collection');

        const deleteHarryPotterCollectionButton = deleteCollectionButtons[0];
        userEvent.click(deleteHarryPotterCollectionButton);
        const collectionCards = screen.getAllByTestId('collections');
        const collectionAll = screen.getByText('All');
        const collectionHarryPotter = screen.queryByText('Harry Potter');
        const collectionMazeRunner = screen.getByText('Maze Runner');

        expect(collectionCards.length).toBe(2);
        expect(collectionAll).toBeInTheDocument();
        expect(collectionHarryPotter).not.toBeInTheDocument();
        expect(collectionMazeRunner).toBeInTheDocument();
    });

    it('should render right number of books in All collection after deleting one collection', function () {
        render(
            <App />
        );

        const deleteCollectionButtons = screen.getAllByText('Delete Collection');

        const deleteMazeRunnerCollectionButton = deleteCollectionButtons[1];
        userEvent.click(deleteMazeRunnerCollectionButton);
        const collectionsCards = screen.getAllByTestId('collections');
        const numberOfBooksAllCollection = within(collectionsCards[0]).getByText('7 books');

        expect(numberOfBooksAllCollection).toBeInTheDocument();
    });

    it('should delete book from list of books of its collection', function () {
        render(
            <App />
        );

        const collectionMazeRunner = screen.getAllByTestId('collections')[2];
        userEvent.click(collectionMazeRunner);
        const booksCards = screen.getAllByTestId('books');
        const theMazeRunnerCardBeforeDelete = booksCards[0];
        const theMazeRunnerCardDeleteButton = within(theMazeRunnerCardBeforeDelete).getByText('Delete');
        userEvent.click(theMazeRunnerCardDeleteButton);
        const booksCardsAfterDelete = screen.getAllByTestId('books');
        const theMazeRunnerCardAfterDelete = screen.queryByText('The Maze Runner');

        expect(booksCardsAfterDelete.length).toBe(4);
        expect(theMazeRunnerCardAfterDelete).not.toBeInTheDocument();
    });

    it('should delete book from list of books of all collection as well', function () {
        render(
            <App />
        );

        const collections = screen.getAllByTestId('collections');
        const collectionMazeRunner = collections[2];
        userEvent.click(collectionMazeRunner);
        const booksCardsMazeRunnerCollection = screen.getAllByTestId('books');
        const theMazeRunnerCardBeforeDelete = booksCardsMazeRunnerCollection[0];
        const theMazeRunnerCardDeleteButton = within(theMazeRunnerCardBeforeDelete).getByText('Delete');
        userEvent.click(theMazeRunnerCardDeleteButton);
        const collectionAll = collections[0];
        userEvent.click(collectionAll);
        const booksCardsAllCollection = screen.getAllByTestId('books');
        const theMazeRunnerCardFromAllCollection = screen.queryByText('The Maze Runner');

        expect(booksCardsAllCollection.length).toBe(11);
        expect(theMazeRunnerCardFromAllCollection).not.toBeInTheDocument();
    });

    it('should adjust number of books in collections', function () {
        render(
            <App />
        );

        const theMazeRunnerCard = screen.getAllByTestId('books')[7];
        const theMazeRunnerCardDeleteButton = within(theMazeRunnerCard).getByText('Delete');
        userEvent.click(theMazeRunnerCardDeleteButton);
        const collections = screen.getAllByTestId('collections');
        const collectionAll = collections[0];
        const numberOfBooksCollectionAll = within(collectionAll).getByText('11 books');
        const collectionMazeRunner = collections[2];
        const numberOfBooksCollectionMazeRunner = within(collectionMazeRunner).getByText('4 books');

        expect(numberOfBooksCollectionAll).toBeInTheDocument();
        expect(numberOfBooksCollectionMazeRunner).toBeInTheDocument();
    });

    it('should open edition card when clicking on Edit button', function () {
        render(
            <App />
        );

        const books = screen.getAllByTestId('books');
        const theScorchTrialsCard = books[8];
        const theScorchTrialsCardEditButton = within(theScorchTrialsCard).getByText('Edit');
        userEvent.click(theScorchTrialsCardEditButton);

        const [ titleInput, authorInput, pagesInput, yearInput, pagesReadInput ] =
            screen.getAllByRole('textbox');

        expect(titleInput.value).toBe('The Scorch Trials');
        expect(authorInput.value).toBe('James Dashner');
        expect(pagesInput.value).toBe('361');
        expect(yearInput.value).toBe('2010');
        expect(pagesReadInput.value).toBe('0');
    });

    it('should open add new book card when clicking on Add New Book button', function () {
        render(
            <App />
        );

        const addNewBookButton = screen.getByRole('button', { name: 'Add new book' });
        userEvent.click(addNewBookButton);
        const titleInput = screen.getByRole('textbox', { name: 'Title:' });
        const authorInput = screen.getByRole('textbox', { name: 'Author:' });
        const pagesInput = screen.getByRole('textbox', { name: 'Pages:' });
        const yearInput = screen.getByRole('textbox', { name: 'Year:' });
        const collectionComboBoxOptions = screen.getByRole('combobox').options;
        const collectionNameInput = screen.getByRole('textbox', { name: 'Collection Name:' });

        expect(titleInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(pagesInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
        expect(collectionNameInput).toBeInTheDocument();
        expect(collectionComboBoxOptions.length).toBe(3);
        expect(collectionComboBoxOptions[0].innerHTML).toBe('New Collection');
        expect(collectionComboBoxOptions[1].innerHTML).toBe('Harry Potter');
        expect(collectionComboBoxOptions[2].innerHTML).toBe('Maze Runner');
    });

    it('should edit book information', function () {
        render(
            <App />
        );

        const theFeverCodeCardBeforeEdition = screen.getAllByTestId('books')[11];
        const theFeverCodeCardEditButton = within(theFeverCodeCardBeforeEdition).getByText('Edit');
        userEvent.click(theFeverCodeCardEditButton);

        const [ titleInput, authorInput, pagesInput, yearInput, pagesReadInput ] =
            screen.getAllByRole('textbox');
        fireEvent.change(pagesReadInput, { target: { value: '100' }});
        const editCardSaveButton = screen.getByRole('button', { name: 'Save' });
        userEvent.click(editCardSaveButton);

        const theFeverCodeCardAfterEdition = screen.getAllByTestId('books')[11];
        const pagesRead = within(theFeverCodeCardAfterEdition).getByText('100 pages read | 29% completed');

        expect(pagesRead).toBeInTheDocument();
        expect(titleInput).not.toBeInTheDocument();
        expect(authorInput).not.toBeInTheDocument();
        expect(pagesInput).not.toBeInTheDocument();
        expect(yearInput).not.toBeInTheDocument();
        expect(pagesReadInput).not.toBeInTheDocument();
    });

    it('should add new book to a new collection', function () {
        render(
            <App />
        );

        const collectionsCardsBeforeEdition = screen.getAllByTestId('collections');
        const collectionAllCardBeforeAddition = collectionsCardsBeforeEdition[0];
        const numberOfBooksCollectionAllBeforeEdition =
            within(collectionAllCardBeforeAddition).getByText('12 books');

        const addNewBookButton = screen.getByRole('button', { name: 'Add new book' });
        userEvent.click(addNewBookButton);
        const titleInput = screen.getByRole('textbox', { name: 'Title:' });
        fireEvent.change(titleInput, { target: { value: 'Wonder' }});
        const authorInput = screen.getByRole('textbox', { name: 'Author:' });
        fireEvent.change(authorInput, { target: { value: 'R J Palacio' }});
        const pagesInput = screen.getByRole('textbox', { name: 'Pages:' });
        fireEvent.change(pagesInput, { target: { value: '315' }});
        const yearInput = screen.getByRole('textbox', { name: 'Year:' });
        fireEvent.change(yearInput, { target: { value: '2012' }});
        const collectionNameInput = screen.getByRole('textbox', { name: 'Collection Name:' });
        fireEvent.change(collectionNameInput, { target: { value: 'Inspiring' }});
        const addBookButton = screen.getByRole('button', { name: 'Add' });
        userEvent.click(addBookButton);

        const collectionsCardsAfterEdition = screen.getAllByTestId('collections');
        const collectionAllCardAfterAddition = collectionsCardsAfterEdition[0];
        const numberOfBooksCollectionAllAfterEdition =
            within(collectionAllCardAfterAddition).getByText('13 books');
        const collectionInspiringCard = collectionsCardsAfterEdition[3];
        const numberOfBooksCollectionInspiring = within(collectionInspiringCard).getByText('1 book');

        expect(collectionsCardsBeforeEdition.length).toBe(3);
        expect(numberOfBooksCollectionAllBeforeEdition).toBeInTheDocument();
        expect(collectionsCardsAfterEdition.length).toBe(4);
        expect(numberOfBooksCollectionAllAfterEdition).toBeInTheDocument();
        expect(collectionInspiringCard).toBeInTheDocument();
        expect(numberOfBooksCollectionInspiring).toBeInTheDocument();
    });

    it('should add new book to existing collection', function () {
        render(
            <App />
        );

        const collectionsCardsBeforeEdition = screen.getAllByTestId('collections');
        const collectionAllCardBeforeAddition = collectionsCardsBeforeEdition[0];
        const numberOfBooksCollectionAllBeforeEdition =
            within(collectionAllCardBeforeAddition).getByText('12 books');
        const bookTheCursedChildCardBeforeAddition = screen.queryByText('The Cursed Child');

        const addNewBookButton = getByRoleButton('Add new book');
        userEvent.click(addNewBookButton);
        const titleInput = screen.getByRole('textbox', { name: 'Title:' });
        fireEvent.change(titleInput, { target: { value: 'The Cursed Child' }});
        const authorInput = screen.getByRole('textbox', { name: 'Author:' });
        fireEvent.change(authorInput, { target: { value: 'J K Rowling' }});
        const pagesInput = screen.getByRole('textbox', { name: 'Pages:' });
        fireEvent.change(pagesInput, { target: { value: '352' }});
        const yearInput = screen.getByRole('textbox', { name: 'Year:' });
        fireEvent.change(yearInput, { target: { value: '2016' }});
        const collectionComboBox = screen.getByRole('combobox');
        fireEvent.click(collectionComboBox, { target: { value: 'Harry Potter' } });
        const collectionNameInput = screen.queryByRole('textbox', { name: 'Collection Name:' });
        const addBookButton = screen.getByRole('button', { name: 'Add' });
        userEvent.click(addBookButton);

        const collectionsCardsAfterEdition = screen.getAllByTestId('collections');
        const collectionAllCardAfterAddition = collectionsCardsAfterEdition[0];
        const numberOfBooksCollectionAllAfterEdition =
            within(collectionAllCardAfterAddition).getByText('13 books');
        const collectionHarryPotter = collectionsCardsAfterEdition[1];
        const numberOfBooksCollectionHarryPotter = within(collectionHarryPotter).getByText('8 books');
        const booksCardsAllCollectionAfterAddition = screen.getAllByTestId('books');
        const bookTheCursedChildCardAllCollectionAfterAddition = within(booksCardsAllCollectionAfterAddition).queryByText('The Cursed Child');

        userEvent.click(collectionHarryPotter);
        const booksCardsHarryPotterCollection = screen.getAllByTestId('books');
        const bookTheCursedChildCardHarryPotterCollection = within(booksCardsHarryPotterCollection).queryByText('The Cursed Child');

        expect(collectionsCardsBeforeEdition.length).toBe(3);
        expect(numberOfBooksCollectionAllBeforeEdition).toBeInTheDocument();
        expect(bookTheCursedChildCardBeforeAddition).not.toBeInTheDocument();
        expect(collectionNameInput).not.toBeInTheDocument();
        expect(collectionsCardsAfterEdition.length).toBe(3);
        expect(numberOfBooksCollectionAllAfterEdition).toBeInTheDocument();
        expect(numberOfBooksCollectionHarryPotter).toBeInTheDocument();
        expect(bookTheCursedChildCardAllCollectionAfterAddition).toBeInTheDocument();
        expect(bookTheCursedChildCardHarryPotterCollection).toBeInTheDocument();
    });

    it('should clear form after saving book', function () {
        render(
            <App />
        );

        const theFeverCodeCardBeforeEdition = screen.getAllByTestId('books')[11];
        const theFeverCodeCardEditButton = within(theFeverCodeCardBeforeEdition).getByText('Edit');
        userEvent.click(theFeverCodeCardEditButton);
        const editCardSaveButton = screen.getByRole('button', { name: 'Save' });
        userEvent.click(editCardSaveButton);
        const addNewBookButton = screen.getByRole('button', { name: 'Add new book' });
        userEvent.click(addNewBookButton);
        const [ titleInput, authorInput, pagesInput, yearInput, collectionName ] =
            screen.getAllByRole('textbox');
        const collectionCombobox = screen.getByRole('combobox');

        expect(pagesRead).toBeInTheDocument();
        expect(titleInput.value).toBe('');
        expect(authorInput.value).toBe('');
        expect(pagesInput.value).toBe('');
        expect(yearInput.value).toBe('');
        expect(collectionName.value).toBe('');
    });
});