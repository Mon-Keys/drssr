import { Clothes } from '../items/clothesReducer';
import { ILook } from '../lookReducer';

export interface IPost {
    id: number;
    creator_id: number;
    type: string;
    clothes?: Array<Clothes>;
    look?: ILook;
    previews_paths: Array<string>;
    likes: number;
}

export interface PostsState {
    posts: Array<IPost>;
    status: string;
    error: string;
}