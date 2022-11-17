import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { IClothesData } from '../network/';

export interface Clothes {
    id: number;
    brand: string;
    color: string;
    type: string;
    img: string;
    img_path: string;
    mask: string;
    mask_path: string;
    description: string;
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
    'items/fetchUsersClothes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getClothes();

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
        },
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
                const clothes = action.payload as unknown as Array<Clothes>;
                state.clothesData = clothes.reverse();
                console.log('done');
            })
            .addCase(fetchUsersClothes.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
            });
    }
});

export const selectUserItems = (state: RootState) => state.clothes.clothesData;

export const getCategories = createSelector(selectUserItems, (items) => {
    const categories = new Array<ClothingCategory>();
    const categoriesAvailable = new Set<string>();
    items.forEach((item) => {
        if (!categoriesAvailable.has(item.type)) {
            categoriesAvailable.add(item.type);
            categories.push({
                caption: item.type,
                img: item.mask_path
            });
        }
    });
    return categories;
});

export default clothesSlice.reducer;
