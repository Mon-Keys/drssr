import http from '../instace';
import * as ImagePicker from 'expo-image-picker';
import { IPost } from '../../reducers/posts/post';

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

export interface IClothesLookData {
    id: number;
    coords: {
        x: number;
        y: number;
    };
    name: string;
}

interface IClothesInsideLookData {
    id: number;
    coords: {
        x: number;
        y: number;
    };
}

export interface ILookData {
    img: string;
    filename: string;
    name: string;
    description: string;
    clothes: Array<IClothesInsideLookData>;
}

export interface IGetLookData extends ILookData {
    id: number;
    clothes: Array<IClothesLookData>;
    img_path: string;
    description: string;
}

export interface ICreatePost {
    element_id: number;
    type: string;
    name: string;
    description: string;
    previews?: Array<ImagePicker.ImagePickerResult>;
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

    createNewLook(data: ILookData) {
        return http.post<ILookData>('/private/looks', data);
    }

    getLooks(limit: number, offset: number) {
        return http.get<Array<IGetLookData>>(
            `/private/looks/all?limit=${limit}&offset=${offset}`
        );
    }

    createPost(data: ICreatePost) {
        // return http.post('/private/posts', {
        //     element_id: data.element_id,
        //     type: data.type,
        //     description: data.description,
        //     previews: {}
        // });
        return http.post<ILookData>('/private/posts', data);
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
}
