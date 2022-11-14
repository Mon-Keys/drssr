import http from './http-common';
import * as ImagePicker from 'expo-image-picker';

interface ILoginData {
    login: string;
    password: string;
}

interface ISignupData {
    nickname: string;
    password: string;
    email: string;
    birth_date?: Date;
    name?: string;
    description?: string;
    avatar?: string; // [Base64]
}

interface IUserData {
    nickname: string;
    email: string;
    avatar?: string;
    stylist: boolean;
    description?: string;
    ctime: number;
}
interface IClothesData {
    id: number;
    brand: string;
    color: string;
    type: string;
    img: string;
    mask: string;
}

interface IUpdateUserData {
    nickname: string;
    email: string;
    name: string;
    avatar: string; // [Base64]
    birth_date: string;
    description: string;
}

interface IItemData {
    file: ImagePicker.ImagePickerResult;
    sex: string;
    brand: string;
}

interface IClothesInsideLookData {
    id: string;
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

class DataService {
    /**
     * Returns axios request handle
     * Get private user data by Cookie
     * @remarks
     * This method is part of the network subsystem}.
     *
     * @beta
     */
    getUserDataByCookie() {
        return http.get<IUserData>('/private/users', { withCredentials: true });
    }

    /**
     * Returns axios request handle
     * Create new user from form data
     * @remarks
     * This method is part of the network subsystem}.
     *
     * @param data - data object required to register account
     * @beta
     */
    signUpUser(data: ISignupData) {
        console.log('signup');
        return http.post<ISignupData>('/public/users/signup', data, {
            withCredentials: false
        });
    }

    /**
     * Returns axios request handle
     * Logins a user using nickname/email:password pair
     * @remarks
     * This method is part of the network subsystem.
     *
     * @param data - data object required login into account
     * @beta
     */
    loginUser(data: ILoginData) {
        return http.post<ILoginData>('/public/users/login', data);
    }

    /**
     * Returns axios request handle
     * Deletes user account by Cookie, requires Cookie
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
    deleteUser() {
        return http.delete<any>('/private/users');
    }

    /**
     * Returns axios request handle
     * Removes user session
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
    logoutUser() {
        return http.delete<any>('/private/users/logout', {
            withCredentials: true
        });
    }

    /**
     * Returns axios request handle
     * Updates user data from form data
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
    updateUser(data: IUpdateUserData) {
        return http.put<IUpdateUserData>('/private/users/', data);
    }

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

    getUsersClothesByCookie() {
        return http.get<Array<IClothesData>>('/private/clothes', {
            withCredentials: true
        });
    }

    createNewLook(data: ILookData) {
        return http.post<ILookData>('/private/looks', data, {
            withCredentials: true
        });
    }
}

export {
    ILoginData,
    IUpdateUserData,
    IUserData,
    ISignupData,
    IItemData,
    IClothesData
};

export default new DataService();
