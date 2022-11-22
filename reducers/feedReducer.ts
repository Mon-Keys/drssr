//нахуя владимир лункин регает 10000000 папок для каждой отдельной функции?

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { IGetLookData, ILookData } from '../network/';
import { IClothesLookData } from '../network/api/common';
import { IPost } from './posts/post';
import { color } from 'react-native-reanimated';

export interface Feed {
    data: Array<IPost>;
    status: string;
}

export interface Feeds {
    SubscribtionFeed: Feed;
    DiscoverFeed: Feed;
    FavoriteFeed: Feed;
}

const initialState = {
    SubscribtionFeed: {
        data: [{
            id: 1,
            creator_id: 1,
            type: 'look',
            clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
            look: {
                id: 1,
                clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
                img_path: 'img',
                description: 'desc'
            },
            previews: ['img1', 'img2'],
            likes: 123213
        }],
        status: 'ready'
    },
    DiscoverFeed: {
        data: [{
            id: 1,
            creator_id: 1,
            type: 'look',
            clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
            look: {
                id: 1,
                clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
                img_path: 'img',
                description: 'desc'
            },
            previews: ['img1', 'img2'],
            likes: 123213
        }],
        status: 'ready'
    },
    FavoriteFeed: {
        data: [{
            id: 1,
            creator_id: 1,
            type: 'look',
            clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
            look: {
                id: 1,
                clothes: [
                {
                    id: 1,
                    brand: "dss",
                    color: "dsds",
                    currency: "RUB",
                    link: "link",
                    type: "Boots",
                    img_path: "clothesImg",
                    mask_path: "clothesMaskImg",
                    owner_id: 1,
                    price: 10000,
                    sex: "male",
                    description: "clothes description",
                }
            ],
                img_path: 'img',
                description: 'desc'
            },
            previews: ['img1', 'img2'],
            likes: 123213
            }
        ],
        status: 'ready'
    }
} as Feeds;

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

export const feedSlice = createSlice({
    name: 'Feeds',
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
