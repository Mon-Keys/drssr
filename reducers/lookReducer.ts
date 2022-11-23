import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { IGetLookData, ILookData } from '../network/';
import { Clothes } from './items/clothesReducer';

export interface ILook {
    id: number;
    clothes: Array<Clothes>;
    img_path: string;
    description: string;
}

interface Looks {
    LooksData: Array<IGetLookData>;
    status: string;
    error: string;
}

const initialState = {
    LooksData: [],
    status: '',
    error: ''
} as Looks;

export const fetchUsersLooks = createAsyncThunk<Array<ILookData>>(
    'Looks/fetchUsersLooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getLooks(10, 0);

            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const looksSlice = createSlice({
    name: 'Looks',
    initialState,
    reducers: {
        loadData: (state) => {
            console.log('not done', state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersLooks.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUsersLooks.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.LooksData =
                    action.payload as unknown as Array<IGetLookData>;
            })
            .addCase(fetchUsersLooks.rejected, (state) => {
                state.status = 'rejected';
            });
    }
});

export const { loadData } = looksSlice.actions;

export const selectLook = (state: RootState) => state.looks;

export default looksSlice.reducer;
