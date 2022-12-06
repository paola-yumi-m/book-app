import {render, screen} from "@testing-library/react";
import {Book} from "../Book";
import {BookFactory} from "../../factories/book-factory";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const bookFactory = new BookFactory();
const book = bookFactory.getBook(
    'Wonder',
    'R J Palacio',
    315,
    2012,
    'Inspiring')
;
const mockSetIsEditable = jest.fn();
const mockSetTitle = jest.fn();
const mockSetAuthor = jest.fn();
const mockSetPages = jest.fn();
const mockSetYear = jest.fn();
const mockSetNewCollectionName = jest.fn();
const mockSetSelectedCollection = jest.fn();
const mockSetCurrentBook = jest.fn();
const mockSetCollections = jest.fn();
const mockSetPagesRead = jest.fn();

describe('<Book />', function () {
    function renderBookComponent() {
        render(
            <Book
                book={
                    book
                }
                setIsEditable={mockSetIsEditable}
                setTitle={mockSetTitle}
                setAuthor={mockSetAuthor}
                setPages={mockSetPages}
                setYear={mockSetYear}
                setNewCollectionName={mockSetNewCollectionName}
                setSelectedCollection={mockSetSelectedCollection}
                setCurrentBook={mockSetCurrentBook}
                setCollections={mockSetCollections}
                setPagesRead={mockSetPagesRead}
            />
        );
    }

    it('should render book card', function () {
        renderBookComponent();

        const title = screen.getByRole('heading', {level: 3});
        const author = screen.getByRole('heading', {level: 4});
        const pages = screen.getByText(`${book.pages} pages`);
        const year = screen.getByText(book.year);
        const collection = screen.getByText(`Collection: ${book.collection}`);
        const pagesRead = screen.getByText(`${book.pagesRead} pages read | 0% completed`);

        expect(title.innerHTML).toBe(book.title);
        expect(author.innerHTML).toBe(book.author);
        expect(pages).toBeInTheDocument();
        expect(year).toBeInTheDocument();
        expect(collection).toBeInTheDocument();
        expect(pagesRead).toBeInTheDocument();
    });

    it('should call handleEditButton when edit button is clicked', function () {
        renderBookComponent();

        const editButton = screen.getByRole('button', { name: 'Edit' });
        userEvent.click(editButton);

        expect(mockSetIsEditable).toBeCalledWith(true);
        expect(mockSetTitle).toBeCalledWith(book.title);
        expect(mockSetAuthor).toBeCalledWith(book.author);
        expect(mockSetPages).toBeCalledWith(book.pages);
        expect(mockSetYear).toBeCalledWith(book.year);
        expect(mockSetNewCollectionName).toBeCalledWith('');
        expect(mockSetCurrentBook).toBeCalledWith(book.id);
        expect(mockSetSelectedCollection).toBeCalledWith(book.collection);
        expect(mockSetPagesRead).toBeCalledWith(book.pagesRead);
    });

    it('should call handleDelete when delete button is clicked', function () {
        renderBookComponent();

        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        userEvent.click(deleteButton);

        expect(mockSetCollections).toBeCalledTimes(1);
    });
});