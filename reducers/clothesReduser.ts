import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import DataService, { IClothesData } from '../network/';

export interface Clothes {
    id: number;
    brand: string;
    color: string;
    type: string;
    img: string;
    mask: string;
}

interface ClothesState {
    isLoggedIn: boolean;
    clothesData: Array<Clothes>;
    status: string;
    error: string;
}

const initialState = {
    isLoggedIn: false,
    clothesData: {},
    status: '',
    error: ''
} as ClothesState;

export const fetchUsersClothes = createAsyncThunk<Array<IClothesData>>(
    'clothes/fetchUsersClothes',
    async (_, { rejectWithValue }) => {
        try {
            console.log('fetching users clothes');
            const response = await DataService.getUsersClothesByCookie();
            console.log(response.data[0].id);
            console.log(response.data[0].brand);
            console.log(response.data[0].color);
            console.log(response.data[0].type);
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

export const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        loadData: (state) => {
            console.log('not done', state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersClothes.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUsersClothes.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                state.clothesData = action.payload as unknown as Array<Clothes>;
                state.isLoggedIn = true;
                // console.log(action);
                console.log('done');
            })
            .addCase(fetchUsersClothes.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
                // state.error = action.payload
            });
    }
});

export const { loadData } = clothesSlice.actions;

export const selectClothes = (state: RootState) => state.clothes;

export default clothesSlice.reducer;
