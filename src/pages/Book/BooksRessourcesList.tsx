import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectAllBooks, selectBooksByIsbnOrTitle } from './booksSlice';
import { RootState } from '../../app/store';
import React, { useEffect } from 'react';
import { Spinner } from '../../shared/Spinner';
import { BookContent } from './BookContent';

export function BooksRessourcesList() {
    const dispatch = useDispatch();
    const booksByIds = useSelector(selectBooksByIsbnOrTitle);
    const books = useSelector(selectAllBooks);

    const bookStatus = useSelector((state: RootState) => state.books.status);
    const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    let content;
    // if (bookStatus === 'loading') {
    //     content = <Spinner text="Loading..."/>;
    // } else if (bookStatus === 'succeeded') {
    //     content = booksByIds.map((isbn) => (
    //         <BookContent booksIsbn={isbn}/>
    //     ));
    // } else if (bookStatus === 'failed') {
    //     content = <div>{error?.message}{error?.stack}</div>;
    // }

    return (
        <section className="posts-list">
            <h2>Books</h2>
            {content}
        </section>
    );
}
