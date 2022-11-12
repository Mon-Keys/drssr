import {
    createSlice,
    createAsyncThunk,
    createSelector
} from '@reduxjs/toolkit';
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
    clothesData: Array<Clothes>;
    status: string;
    error: string;
}


export interface ClothingCategory {
    caption: string;
    img: string;
}


const initialState = {
    clothesData: [],
    status: '',
    error: ''
} as ClothesState;

export const fetchUsersClothes = createAsyncThunk<Array<IClothesData>>(
    'clothes/fetchUsersClothes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await DataService.getUsersClothesByCookie();

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
                // console.log(action);
                console.log('done');
            })
            .addCase(fetchUsersClothes.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');

            });
    }
});

export const { loadData } = clothesSlice.actions;

export const selectClothes = (state: RootState) => state.clothes;

export const selectUserItems = (state: RootState) => state.clothes.clothesData;

export const getCategories = createSelector(selectUserItems, (items) => {
    const categoriesAvailable = new Set<ClothingCategory>();
    items.forEach((item) => {
        categoriesAvailable.add({
            caption: item.type + " " + item.brand,
            img: item.mask,
        });

    });
    return Array.from(categoriesAvailable);
});

export default clothesSlice.reducer;
