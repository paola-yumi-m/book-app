import {prettyDOM, render, screen, within} from "@testing-library/react";
import {App} from "../App";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

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
});