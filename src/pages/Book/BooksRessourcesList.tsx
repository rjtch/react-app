import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectAllBooks } from './BooksSlice';
import { RootState } from '../../app/store';
import React, { useEffect } from 'react';
import { Spinner } from '../../shared/Spinner';
import { BookContent } from './BookContent';

export function BooksRessourcesList() {
    const dispatch = useDispatch();
    const books = useSelector(selectAllBooks);

    const bookStatus = useSelector((state: RootState) => state.books.status);
    const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    let content;
    if (bookStatus === 'loading') {
        content = <Spinner text="Loading..."/>;
    } else if (bookStatus === 'succeeded') {
        let index = 0;
        books.forEach(book =>
            content = (book.bookResourceList ?
                book.bookResourceList.map(val =>
              <BookContent index={index++} key={val.identifier} book={val}/>) : null)
        );
    } else if (bookStatus === 'failed') {
        content = <div>404 nothing to show here!!</div>;
    }

    return (
        <section>
            <h2 className="book-list">Books</h2>
            {content}
        </section>
    );
}
