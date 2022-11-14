import {
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';


interface CreateLookState {
    status: string;
    error: string;
    look: {
        img: string
    }
}

const initialState = {
    status: '',
    error: '',
    look: {
        img: ''
    }
} as CreateLookState;



export const createLookSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        addLookPhoto: (state,action: PayloadAction<string>) => {
            console.log('event triggered')
            console.log(action.payload.slice(0,200))
            state.look.img = action.payload
        }
    },
    extraReducers: (builder) => {
           
    }
});

export const { addLookPhoto } = createLookSlice.actions;

export const selectCreateLook = (state: RootState) => state.createLook;

export default createLookSlice.reducer;
