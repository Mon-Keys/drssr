import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../reducers/userReducer';
import { clothesSlice } from '../reducers/items/clothesReducer';
import { createLookSlice } from '../reducers/createLookReducer';
import { looksSlice } from '../reducers/lookReducer';
import { postsSlice } from "../reducers/posts/postReducer";

const combinedReducer = combineReducers({
    user: userSlice.reducer,
    clothes: clothesSlice.reducer,
    createLook: createLookSlice.reducer,
    looks: looksSlice.reducer,
    posts: postsSlice.reducer
});

// https://codesandbox.io/s/reset-state-redux-toolkit-p515y?file=/src/store.ts
// @ts-ignore
const rootReducer = (state, action) => {
    if (action.type === 'user/logoutUser/pending') {
        state = undefined; // TODO хак для очистки всех сторов при логауте
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

// @ts-ignore
export type AppDispatch = typeof store.dispatch;
