import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectBookById } from './booksSlice';
import { Fragment } from 'react';

interface Props {
    booksIsbn: any;
}

export const BookContent = ({ booksIsbn }: Props) => {
    const book =
        useSelector((state: RootState) => selectBookById(state, booksIsbn));
    if (book?.content) {
        for (let b of book?.content) {
            return (
                <article>
                    <h3>{b.title}</h3>
                    <div>
                        <span>{b.isbn}</span>
                        <span>{b.description}</span>
                        <span>{b.authors}</span>
                    </div>
                </article>
            );
        }
    }
    return <></>;
};
