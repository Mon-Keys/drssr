import { createSlice } from '@reduxjs/toolkit';
import {createPost, getPosts} from "./createPost";
import {IPost, PostsState} from "./post";
import {RootState} from "../../store";

const initialState = {
    posts: [],
    status: '',
    error: ''
} as PostsState;

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadData: (state) => {
            console.log('not done loadData111', state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'resolved';
                const post = action.payload as unknown as IPost;
                if (post) {
                    state.posts.unshift(post);
                }
            })
            .addCase(createPost.rejected, (state) => {
                state.status = 'rejected';
            })

            .addCase(getPosts.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'resolved';
                const posts = action.payload as unknown as Array<IPost>;
                if (posts) {
                    state.posts = posts.reverse();
                }
            })
            .addCase(getPosts.rejected, (state) => {
                state.status = 'rejected';
            })
    }
});

// export const { loadData, choosePhoto, clearAddItem } = clothesSlice.actions
//
export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
