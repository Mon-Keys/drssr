import {
    createSlice,
    createAsyncThunk,
    createSelector
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import DataService, {IGetLookData, ILookData} from '../network/';

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
            const response = await DataService.getUsersLooksByCookie(10,0);

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

export const LooksSlice = createSlice({
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
                console.log('resolved');
                state.LooksData = action.payload as unknown as Array<IGetLookData>;
                // console.log(action);
                console.log('done');
            })
            .addCase(fetchUsersLooks.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
            });
    }
});

export const { loadData } = LookSlice.actions;

export const selectLook = (state: RootState) => state.Look;

export const selectUserItems = (state: RootState) => state.Look.LookData;

export const getCategories = createSelector(selectUserItems, (items) => {
    const categoriesAvailable = new Set<ClothingCategory>();
    items.forEach((item) => {
        categoriesAvailable.add({
            caption: item.type + ' ' + item.brand,
            img: item.mask
        });
    });
    return Array.from(categoriesAvailable);
});

export default LookSlice.reducer;
