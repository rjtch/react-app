import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction, } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CollectionModelBookResource } from '../../api/generated';
import produce from 'immer';
import { createBook, getAllBooks } from '../../api/sampleAuthServer';

const booksAdapter = createEntityAdapter<CollectionModelBookResource>();

  export interface State extends EntityState<CollectionModelBookResource> {
    ids: string[];
    isLoading: boolean;
    error?: null;
    status: string
}

export const initialState: State = booksAdapter.getInitialState({
    ids: [],
    isLoading: false,
    error: null,
    status: 'idle'
});

export const fetchBooks: any = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const response = await getAllBooks();
        return response;
    });

export const addNewBook: any = createAsyncThunk(
    'books/createBook',
    async (resource: any) => {
        const response = await createBook(resource);
        // The response includes the complete post object, including unique ID
        return response;
    });

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        ...initialState,
    },
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
                        bookResourceList: [
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
                existingBook.bookResourceList?.filter((item: { isbn: any; }) => item.isbn === isbn)
                    .forEach((val: { title: any; description: any; authors: any[]; }) => {
                        val.title = title;
                        val.description = description;
                        val.authors.push(authors);
                    });
            }
        }
    },
    extraReducers(builder) {
        builder

            .addCase(fetchBooks.pending, (state, action) => {
                state.status = 'loading';
            })

            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                booksAdapter.upsertMany(state, action.payload);
            })

            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

            // Use the `addOne` reducer for the fulfilled case
            .addCase(addNewBook, booksAdapter.addOne)

            // Use the `addOne` reducer for the fulfilled case
            .addCase(updateBook, booksAdapter.updateOne)

            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => {
            });
    }
});

export default booksSlice.reducer;

export const { createNewBook, updateBook} = booksSlice.actions;

export const { selectAll: selectAllBooks, selectEntities: selectBooksByIsbnOrTitle } =
    booksAdapter.getSelectors((state: RootState) => state.books);

export const selectBookByTitleOrByIsbn = createSelector(
    [selectAllBooks, (state, item) => item],
    (books, key) => books.filter((book) =>
        book.bookResourceList?.find(book => (book.isbn === key || book.title === key))
    ));
