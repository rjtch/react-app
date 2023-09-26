import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import  booksReducer from '../pages/Book/BooksSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
//        users: usersReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
