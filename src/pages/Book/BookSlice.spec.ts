import booksSlice, { createNewBook, initialState, State } from './booksSlice';
import booksReducer, { updateBook } from './booksSlice';
import { createInitialStateFactory } from '@reduxjs/toolkit/dist/entities/entity_state';
import { CollectionModelBookResource } from '../../api/generated';

const entities =
    {
        content: [
            {
                isbn: 'isbn',
                title: 'sample title to be updated',
                description: 'sample description to be updated',
                authors: ['Thomas Tuchel']
            }
        ],
        link: []
    };

describe('book reducer', () => {
    it('should handle initial state', () => {
        expect(booksSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should load allBooks and update state', () => {
        const state: State = initialState;

        // given
        const actualState = booksReducer(
            state,
            createNewBook(entities.content[0].isbn,
                entities.content[0].title,
                entities.content[0].description,
                entities.content[0].authors));

        const newState = {
            content: [
                {
                    isbn: 'isbn',
                    title: 'sample title',
                    description: 'sample description',
                    authors: ['Carlo Ancelotti']
                }
            ],
            link: []
        };

        const expectedState = booksReducer(
            actualState,
            updateBook(newState));

        expect(initialState).toEqual(expectedState);
    });
});
