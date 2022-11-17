import http from "../instace"
import * as ImagePicker from "expo-image-picker";


export interface IItemData {
    file: ImagePicker.ImagePickerResult;
    sex: string;
    brand: string;
}

export interface IClothesData {
    id: number;
    brand: string;
    color: string;
    type: string;
    img: string;
    mask: string;
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
}

// TODO пока все запросы на вещи луки тут, но ваще по хорошему они должны быть в разных классах для стилиста и юзера
export default class Common {
    checkImage(data: IItemData) {
        let bodyFormData = new FormData();

        bodyFormData.append('sex', 'male');
        bodyFormData.append('brand', 'prada');
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

    getClothes() {
        return http.get<Array<IClothesData>>('/private/clothes', {
            withCredentials: true
        });
    }

    createNewLook(data: ILookData) {
        return http.post<ILookData>('/private/looks', data, {
            withCredentials: true
        });
    }

    getLooks(limit: number, offset: number) {
        return http.get<Array<IGetLookData>>(
            `/private/looks/all?limit=${limit}&offset=${offset}`,
            {
                withCredentials: true
            }
        );
    }
}
