import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../reducers/userReducer';
import { itemEditorSlice } from '../reducers/itemEditorReducer';
import { clothesSlice } from '../reducers/clothesReducer';
import { createLookSlice } from '../reducers/createLookReducer';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        itemEditor: itemEditorSlice.reducer,
        clothes: clothesSlice.reducer,
        createLook: createLookSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
