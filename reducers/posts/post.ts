import { Clothes } from '../items/clothesReducer';
import { ILook } from '../lookReducer';

export interface IPost {
    id: number;
    creator_id: number;
    type: string;
    clothes?: Clothes;
    look?: ILook;
    previews: Array<string>;
    likes: number;
}

export interface PostsState {
    posts: Array<IPost>;
    status: string;
    error: string;
}
