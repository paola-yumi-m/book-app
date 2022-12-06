import {render, screen} from "@testing-library/react";
import {Collections} from "../Collections";
import {CollectionFactory} from "../../factories/collection-factory";
import {BookFactory} from "../../factories/book-factory";
import '@testing-library/jest-dom';

const book = new BookFactory().getBook(
    'Wonder',
    'R J Palacio',
    315,
    2012,
    'Inspiring');

function getCollection(name, listOfBooks) {
    return new CollectionFactory().getCollection(name, listOfBooks);
}

const collection = getCollection('Inspiring', [book]);
const mockSetCollection = jest.fn();
const mockSetCollections = jest.fn();

describe('<Collection />', function () {
    function renderCollectionComponent(collection) {
        render(
            <Collections
                collection={collection}
                id={0}
                setCollection={mockSetCollection}
                setCollections={mockSetCollections}
            />
        );
    }

    it('should render collection card', function () {
        renderCollectionComponent(collection);

        const name = screen.getByRole('heading', {level: 3});
        const numberOfBooks = screen.getByText('1 book');
        const deleteButton = screen.getByRole('button', { name: 'Delete' });

        expect(name.innerHTML).toBe(collection.name);
        expect(numberOfBooks).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('should render books instead of book when collection has 2 or more books', function () {
        renderCollectionComponent(getCollection('Inspiring', [book, book]));

        const numberOfBooks = screen.getByText('2 books');

        expect(numberOfBooks).toBeInTheDocument();
    });

    it('should NOT render delete button when collection name is All', function () {
        renderCollectionComponent(getCollection('All', [book]));

        const deleteButton = screen.queryByRole('button', { name: 'Delete' });

        expect(deleteButton).not.toBeInTheDocument();
    });
});