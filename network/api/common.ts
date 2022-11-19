import http from "../instace"
import * as ImagePicker from "expo-image-picker";


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
    description: string;
    clothes: Array<IClothesInsideLookData>;
}

export interface IGetLookData extends ILookData {
    id: number;
    clothes: Array<IClothesLookData>;
    img_path: string;
}

// TODO пока все запросы на вещи луки тут, но ваще по хорошему они должны быть в разных классах для стилиста и юзера
export default class Common {
    checkImage(data: IItemData) {
        let bodyFormData = new FormData();

        bodyFormData.append('file', {
            //@ts-ignore
            uri: data.file.uri,
            type: 'image/jpg',
            name: 'name.jpg'
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
}
