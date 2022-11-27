import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createPost, getPosts } from './createPost';
import {INewPost, IPost, PostsState} from './post';
import { RootState } from '../../store';
import * as ImagePicker from "expo-image-picker";

const initPrepareNewPost: INewPost = {
    type: '',
    previews_paths: [],
}

const initialState = {
    posts: [],
    prepareNewPost: initPrepareNewPost,
    status: '',
    error: ''
} as PostsState;

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadData: (state) => {
        },
        addPhotoForNewPost: (
            state,
            action: PayloadAction<ImagePicker.ImageInfo>
        ) => {
            state.prepareNewPost.previews_paths.unshift(action.payload);
        },
        deletePhotoForNewPost: (
            state,
            action
        ) => {
            state.prepareNewPost.previews_paths = state.prepareNewPost.previews_paths.filter((item, index) => index !== action.payload);
        },
        clearNewPost: (state) => {
            state.prepareNewPost = initPrepareNewPost;
        }
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
            });
    }
});

export const { addPhotoForNewPost, deletePhotoForNewPost, clearNewPost } = postsSlice.actions

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectNewPosts = (state: RootState) => state.posts.prepareNewPost;

export default postsSlice.reducer;
