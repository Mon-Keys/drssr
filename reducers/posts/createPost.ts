import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../network";
import {ICreatePost} from "../../network/api/common";

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (data: ICreatePost, thunkAPI) => {
        const response = await Api.Common.createPost(data)
        return response.data
    }
);

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, thunkAPI) => {
        const response = await Api.Common.getPosts();
        console.log(response.data)
        return response.data;
    }
);
