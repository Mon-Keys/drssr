import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import DataService, { ILookData } from '../network';
import { RootState } from '../store';

interface CreateLookState {
    status: string;
    error: string;
    look: {
        img: string;
    };
}

const initialState = {
    status: '',
    error: '',
    look: {
        img: ''
    }
} as CreateLookState;

export const newLook = createAsyncThunk<ILookData, ILookData>(
    'user/signUpUser',
    async (lookData, { rejectWithValue }) => {
        try {
            console.log('sending signup');
            const response = await DataService.createNewLook(lookData);
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const createLookSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        addLookPhoto: (state, action: PayloadAction<string>) => {
            console.log('event triggered');
            console.log(action.payload.slice(0, 200));
            state.look.img = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newLook.pending, (state) => {
                state.status = 'pending';
                console.log('pending');
            })
            .addCase(newLook.fulfilled, (state) => {
                state.status = 'resolved';
                console.log('resolved');
            })
            .addCase(newLook.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
            });
    }
});

export const { addLookPhoto } = createLookSlice.actions;

export const selectCreateLook = (state: RootState) => state.createLook;

export default createLookSlice.reducer;
