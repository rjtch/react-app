import {
    createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityId, EntityState, PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CollectionModelBookResource } from '../../api/generated';
import produce from 'immer';
import { createBook, getAllBooks } from '../../api/sampleAuthServer';

const API_URL = 'http://localhost:9091/library-server';

const booksAdapter = createEntityAdapter<CollectionModelBookResource>();

export interface State extends EntityState<CollectionModelBookResource> {
    booksIsbn: string[],
    status: string,
    isLoading: boolean;
    error?: { stack: string; message: string } | undefined | null;
}

export const initialState: State = booksAdapter.getInitialState({
    booksIsbn: [],
    entities: {},
    isLoading: false,
    error: null,
    status: 'idle'
});

export const fetchBooks: any = async () => {
    const response = await getAllBooks();
    return response.data;
};

export const addNewBook: any = async (resource: any) => {
    // We send the initial data to the fake API server
    const response = await createBook(resource);
    // The response includes the complete post object, including unique ID
    return response.data;
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        createNewBook: {
            reducer(state, action: PayloadAction<CollectionModelBookResource>) {
                return produce(state, (draftState: { books: CollectionModelBookResource }) => {
                    draftState.books = action.payload;
                });
            },
            prepare(title, isbn, description, authors) {
                return {
                    payload: {
                        content: [
                            title,
                            isbn,
                            description,
                            authors,
                            false
                        ]
                    }
                };
            }
        },
        updateBook(state, action) {
            const { title, description, authors, isbn } = action.payload;
            const existingBook = state.entities[isbn];
            if (existingBook) {
                existingBook.content?.filter((item: { isbn: any; }) => item.isbn === isbn)
                    .forEach((val: { title: any; description: any; authors: any[]; }) => {
                        val.title = title;
                        val.description = description;
                        val.authors.push(authors);
                    });
            }
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(fetchBooks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                booksAdapter.upsertMany(state, action.payload as Record<EntityId, CollectionModelBookResource>);
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = { stack: action.error.stack ?? '', message: action.error.message ?? '' };
            })
            // Use the `addOne` reducer for the fulfilled case
            .addCase(addNewBook, booksAdapter.addOne);
    }
});

export default booksSlice.reducer;

export const { createNewBook, updateBook } = booksSlice.actions;

export const { selectAll: selectAllBooks, selectById: selectBookById, selectIds: selectBooksByIsbnOrTitle } =
    booksAdapter.getSelectors((state: RootState) => state.books);

export const selectBookByTitleOrByIsbn = createSelector(
    [selectAllBooks, (state, item) => item],
    (books, key) => books.filter((book) =>
        book.content?.find(book => (book.isbn === key || book.title === key))
    ));
