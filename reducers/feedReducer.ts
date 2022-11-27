//нахуя владимир лункин регает 10000000 папок для каждой отдельной функции?

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { IGetLookData, ILookData } from '../network/';
import { IClothesLookData, IReaction } from '../network/api/common';
import { IPost } from './posts/post';

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
        data: [
            {
                id: 1,
                creator_id: 1,
                type: 'look',
                look: {
                    id: 1,
                    clothes: [
                        {
                            id: 1,
                            brand: 'dss',
                            color: 'dsds',
                            currency: 'RUB',
                            link: 'link',
                            type: 'Boots',
                            img_path: 'clothesImg',
                            mask_path: 'clothesMaskImg',
                            owner_id: 1,
                            price: 10000,
                            sex: 'male',
                            description: 'clothes description'
                        }
                    ],
                    img_path: 'img',
                    description: 'desc'
                },
                previews: [
                    'https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg',
                    'img2'
                ],
                likes: 123213
            }
        ],
        status: 'ready'
    },
    DiscoverFeed: {
        data: [
            {
                id: 1,
                creator_id: 1,
                type: 'look',
                look: {
                    id: 1,
                    clothes: [
                        {
                            id: 1,
                            brand: 'dss',
                            color: 'dsds',
                            currency: 'RUB',
                            link: 'link',
                            type: 'Boots',
                            img_path: 'clothesImg',
                            mask_path: 'clothesMaskImg',
                            owner_id: 1,
                            price: 10000,
                            sex: 'male',
                            description: 'clothes description'
                        }
                    ],
                    img_path: 'img',
                    description: 'desc'
                },
                previews: [
                    'https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg',
                    'img2'
                ],
                likes: 123213
            }
        ],
        status: 'ready'
    },
    FavoriteFeed: {
        data: [
            {
                id: 1,
                creator_id: 1,
                type: 'look',
                look: {
                    id: 1,
                    clothes: [
                        {
                            id: 1,
                            brand: 'dss',
                            color: 'dsds',
                            currency: 'RUB',
                            link: 'link',
                            type: 'Boots',
                            img_path: 'clothesImg',
                            mask_path: 'clothesMaskImg',
                            owner_id: 1,
                            price: 10000,
                            sex: 'male',
                            description: 'clothes description'
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

export const fetchFavoritePosts = createAsyncThunk<Array<IPost>>(
    'Feeds/fetchFavoritePosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getFavoritePosts(10, 0);

            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSubscribtionPosts = createAsyncThunk<Array<IPost>>(
    'Feeds/fetchSubscribtionPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getSubscribtionPosts(10, 0);

            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDiscoverPosts = createAsyncThunk<Array<IPost>>(
    'Feeds/fetchDiscoverPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getDiscoverPosts(10, 0);

            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const likePost = createAsyncThunk<
    { id: number; likesAmount: number },
    { id: number; likesAmount: number }
>('feeds/likePost', async (data, { rejectWithValue }) => {
    try {
        const response = await Api.Common.like(data.id, data.likesAmount);
        if (response.status !== 200) {
            throw new Error(`Error, status ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const dislikePost = createAsyncThunk<
    { id: number; likesAmount: number },
    { id: number; likesAmount: number }
>('feeds/likePost', async (data, { rejectWithValue }) => {
    try {
        const response = await Api.Common.dislike(data.id, data.likesAmount);
        if (response.status !== 200) {
            throw new Error(`Error, status ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const feedSlice = createSlice({
    name: 'Feeds',
    initialState,
    reducers: {
        loadData: (state) => {
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritePosts.pending, (state) => {
                state.FavoriteFeed.status = 'pending';
            })
            .addCase(fetchFavoritePosts.fulfilled, (state, action) => {
                state.FavoriteFeed.status = 'resolved';
                state.FavoriteFeed.data = action.payload;
            })
            .addCase(fetchFavoritePosts.rejected, (state) => {
                state.FavoriteFeed.status = 'rejected';
            })
            .addCase(fetchDiscoverPosts.pending, (state) => {
                state.DiscoverFeed.status = 'pending';
            })
            .addCase(fetchDiscoverPosts.fulfilled, (state, action) => {
                state.DiscoverFeed.status = 'resolved';
                state.DiscoverFeed.data = action.payload;
            })
            .addCase(fetchDiscoverPosts.rejected, (state) => {
                state.DiscoverFeed.status = 'rejected';
            })
            .addCase(fetchSubscribtionPosts.pending, (state) => {
                state.SubscribtionFeed.status = 'pending';
            })
            .addCase(fetchSubscribtionPosts.fulfilled, (state, action) => {
                state.SubscribtionFeed.status = 'resolved';
                state.SubscribtionFeed.data = action.payload;
            })
            .addCase(fetchSubscribtionPosts.rejected, (state) => {
                state.SubscribtionFeed.status = 'rejected';
            });
    }
});

export const { loadData } = feedSlice.actions;

export const selectFeeds = (state: RootState) => state.feeds;

export default feedSlice.reducer;
