import { Clothes } from '../items/clothesReducer';
import * as ImagePicker from 'expo-image-picker';
import { ILook } from '../looks/looks';

export interface IPost {
    id: number;
    creator_id: number;
    type: string;
    clothes?: Array<Clothes>;
    look?: ILook;
    previews_paths: Array<string>;
    likes: number;
}

export interface INewPost {
    type: string;
    clothes?: Array<Clothes>;
    look?: ILook;
    previews_paths: Array<ImagePicker.ImageInfo>;
}

export interface PostsState {
    posts: Array<IPost>;
    prepareNewPost: INewPost;
    status: string;
    error: string;
}
