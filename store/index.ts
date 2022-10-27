import { configureStore } from '@reduxjs/toolkit';
// ...

import { wardrobeSlice } from '../reducers/wardrobeReducer';
import { userSlice } from '../reducers/userReducer';
import { itemEditorSlice } from '../reducers/itemEditorReducer';

export const store = configureStore({
    reducer: {
        wardrobe: wardrobeSlice.reducer,
        user: userSlice.reducer,
        itemEditor: itemEditorSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
