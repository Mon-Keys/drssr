import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import Api from '../../network';
import { ILook, ILooks } from './looks';

const initialState = {
    LooksData: [],
    status: '',
    error: ''
} as ILooks;

export const fetchUsersLooks = createAsyncThunk<Array<ILook>>(
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
        loadData: (state) => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersLooks.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUsersLooks.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.LooksData = action.payload as unknown as Array<ILook>;
            })
            .addCase(fetchUsersLooks.rejected, (state) => {
                state.status = 'rejected';
            });
    }
});

export const { loadData } = looksSlice.actions;

export const selectLook = (state: RootState) => state.looks;
export const selectLooks = (state: RootState) => state.looks.LooksData;

export default looksSlice.reducer;
