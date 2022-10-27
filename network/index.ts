import http from './http-common';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker';

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
        return http.get<IUserData>('/users/private', { withCredentials: true });
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
        return http.post<ISignupData>('/users/public/signup', data, {
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
        return http.post<ILoginData>('/users/public/login', data);
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
        return http.delete<any>('/users/private');
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
        return http.delete<any>('/users/private/logout', {
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
        return http.put<IUpdateUserData>('/users/private/');
    }

    checkImage(data: IItemData) {
        let bodyFormData = new FormData();

        let photo = { uri: data.file };
        console.log(data);
        bodyFormData.append('sex', 'male');
        bodyFormData.append('brand', 'prada');
        bodyFormData.append('file', {
            //@ts-ignore
            uri: data.file.uri,
            type: 'image/jpg',
            name: 'name.jpg'
        });
        return http.post('/clothes', bodyFormData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

export { ILoginData, IUpdateUserData, IUserData, ISignupData, IItemData };

export default new DataService();
