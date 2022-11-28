import http from '../instace';
import * as ImagePicker from 'expo-image-picker';
import { IPost } from '../../reducers/posts/post';
import { ILook } from '../../reducers/looks/looks';
import {Clothes} from "../../reducers/items/clothesReducer";

export interface IItemData {
    id?: number;
    file?: ImagePicker.ImagePickerResult;
    sex?: string;
    brand?: string;
    color?: string;
    currency?: string;
    link?: string;
    type?: string;
    price?: number;
    description?: string;
}

export interface IClothesData {
    id: number;
    brand: string;
    color: string;
    currency: string;
    link: string;
    type: string;
    img_path: string;
    mask_path: string;
    owner_id: number;
    price: number;
    sex: string;
    description: string;
}

export interface IClothesInsideLookData {
    id: number;
    coords: {
        x: number;
        y: number;
    };
}

export interface ICreateLook {
    img: string;
    filename: string;
    name: string;
    description: string;
    clothes: Array<IClothesInsideLookData>;
}

export interface IUpdateLook {
    img: string;
    filename: string;
    creator_id: number;
    name: string;
    description: string;
    clothes: Array<IClothesInsideLookData>;
}

export interface ICreatePost {
    element_id: number;
    type: string;
    name: string;
    description: string;
    previews?: Array<string>;
}

export interface IReaction {
    id: number;
    isLike: boolean;
}

export interface IReactionResult {
    likes: number;
}

function GenerateRandomString(length: number): string {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export function GenerateRandomName(): string {
    return GenerateRandomString(10) + '.jpg';
}

// TODO пока все запросы на вещи и Луки тут, но ваще по хорошему они должны быть в разных классах для стилиста и юзера
export default class Common {
    checkImage(data: IItemData) {
        let bodyFormData = new FormData();

        bodyFormData.append('file', {
            //@ts-ignore
            uri: data.file.uri,
            type: 'image/jpg',
            name: GenerateRandomName()
        });
        return http.post('/private/clothes', bodyFormData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    updateClothes(data: IItemData) {
        return http.put(`/private/clothes?id=${data.id}`, data);
    }

    getClothes() {
        return http.get<Array<IClothesData>>('/private/clothes');
    }

    createNewLook(data: ICreateLook) {
        return http.post<ICreateLook>('/private/looks', data);
    }

    updateLook(data: IUpdateLook, id: number) {
        console.log('___________________________________');
        console.log(data.clothes);
        console.log(data.description);
        console.log(data.filename);
        console.log(data.name);
        console.log(data.img.slice(0, 10));
        console.log(data.creator_id);
        data.creator_id = 1; // backend issues epta does not work otherwise

        return http.put<IUpdateLook>(`/private/looks?id=${id}`, data);
    }

    getLooks(limit: number, offset: number) {
        return http.get<Array<ILook>>(
            `/private/looks/all?limit=${limit}&offset=${offset}`
        );
    }

    createPost(data: ICreatePost) {
        return http.post('/private/posts', data);
    }

    getPosts(limit: number = 10, offset: number = 0) {
        return http.get<Array<IPost>>(
            `/private/posts/all?limit=${limit}&offset=${offset}`
        );
    }

    getFavoritePosts(limit: number = 10, offset: number = 0) {
        return http.get<Array<IPost>>(
            `/private/posts/likes?limit=${limit}&offset=${offset}`,
            {
                withCredentials: true
            }
        );
    }

    getDiscoverPosts(limit: number = 10, offset: number = 0) {
        return http.get<Array<IPost>>(
            `/public/posts/all?limit=${limit}&offset=${offset}`
        );
    }

    getSubscribtionPosts(limit: number = 10, offset: number = 0) {
        return http.get<Array<IPost>>(
            `/public/posts/all?limit=${limit}&offset=${offset}`
        );
    }

    like(id: number, likes: number) {
        return http.post(`/private/posts/likes?id=${id}`, {
            likes: likes
        });
    }

    dislike(id: number, likes: number) {
        return http.delete(`/private/posts/likes?id=${id}`);
    }

    getClothesById(id: number) {
        return http.get<Clothes>(`/public/clothes?id=${id}`);
    }
}
