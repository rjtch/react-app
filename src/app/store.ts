import { configureStore } from '@reduxjs/toolkit';
import  booksReducer from '../pages/Book/booksSlice';

const store = configureStore({
    reducer: {
        books: booksReducer,
//        users: usersReducer
    },
    middleware: []
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
