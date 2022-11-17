import { combineReducers, configureStore} from '@reduxjs/toolkit';

import {userSlice} from '../reducers/userReducer';
import {itemEditorSlice} from '../reducers/itemEditorReducer';
import {clothesSlice} from '../reducers/clothesReducer';
import {createLookSlice} from '../reducers/createLookReducer';
import {looksSlice} from '../reducers/lookReducer';


const combinedReducer = combineReducers({
    user: userSlice.reducer,
    itemEditor: itemEditorSlice.reducer,
    clothes: clothesSlice.reducer,
    createLook: createLookSlice.reducer,
    looks: looksSlice.reducer
});

// https://codesandbox.io/s/reset-state-redux-toolkit-p515y?file=/src/store.ts
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

export type AppDispatch = typeof store.dispatch;
