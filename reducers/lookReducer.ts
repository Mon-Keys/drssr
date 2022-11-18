import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { IGetLookData, ILookData } from '../network/';

interface LookState {
    LooksData: Array<IGetLookData>;
    status: string;
    error: string;
}

const initialState = {
    LooksData: [],
    status: '',
    error: ''
} as LookState;

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
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const looksSlice = createSlice({
    name: 'Looks',
    initialState,
    reducers: {
        loadData: (state) => {
            // console.log('not done', state);
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
                console.log('resolved');
                state.LooksData =
                    action.payload as unknown as Array<IGetLookData>;
                // console.log(action);
                console.log('done');
            })
            .addCase(fetchUsersLooks.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
            });
    }
});

export const { loadData } = looksSlice.actions;

export const selectLook = (state: RootState) => state.looks;

export default looksSlice.reducer;
