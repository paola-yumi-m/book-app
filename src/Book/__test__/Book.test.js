import {render, screen} from "@testing-library/react";
import {Book} from "../Book";
import {BookFactory} from "../../factories/book-factory";
import '@testing-library/jest-dom';

const bookFactory = new BookFactory();
const book = bookFactory.getBook(
    'Wonder',
    'R J Palacio',
    315,
    2012,
    'Inspiring')
;
describe('<Book />', function () {
    it('should render book card', function () {
        render(
            <Book
                book={
                book
                }
                setIsEditable={jest.fn()}
                setTitle={jest.fn()}
                setAuthor={jest.fn()}
                setPages={jest.fn()}
                setYear={jest.fn()}
                setNewCollectionName={jest.fn()}
                setSelectedCollection={jest.fn()}
                setCurrentBook={jest.fn()}
                setCollections={jest.fn()}
                setPagesRead={jest.fn()}
            />
        );

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
});