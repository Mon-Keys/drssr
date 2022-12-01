import http from '../instace';
import { GenerateRandomName } from './common';
import * as ImagePicker from 'expo-image-picker';

export interface IUserData {
    nickname: string;
    email: string;
    avatar: string;
    stylist: boolean;
    description?: string;
    ctime: number;
}

export interface IUpdateUserData {
    nickname: string;
    email: string;
    name: string;
    birth_date: string;
    description: string;
}

export interface IAvatarData {
    file: ImagePicker.ImagePickerResult;
}

export interface ICheckStylist {
    exists: boolean;
}


export default class User {
    /**
     * Returns axios request handle
     * Get private user data by Cookie
     * @remarks
     * This method is part of the network subsystem}.
     *
     * @beta
     */
    getUser() {
        return http.get<IUserData>('/private/users', { withCredentials: true });
    }

    updateUser(data: IUpdateUserData) {
        return http.put<IUserData>('/private/users', data);
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
        return http.delete('/private/users');
    }

    /**
     * Returns axios request handle
     * Deletes user account by Cookie, requires Cookie
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
    addAvatar(data: IAvatarData) {
        let bodyFormData = new FormData();

        bodyFormData.append('file', {
            //@ts-ignore
            uri: data.file.uri,
            type: 'image/jpg',
            name: GenerateRandomName()
        });
        return http.post<IUserData>('/private/users/avatar', bodyFormData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    /**
     * Returns axios request handle
     * Deletes user account by Cookie, requires Cookie
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
    deleteAvatar() {
        return http.delete<IUserData>('/private/users/avatar');
    }

    /**
     * Returns axios request handle
     * Removes user session
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
     requestStylist() {
        return http.post<any>('/private/users/stylist', {
            withCredentials: true
        });
    }

    /**
     * Returns axios request handle
     * Removes user session
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
     checkStylist() {
        return http.get<ICheckStylist>('/private/users/stylist', {
            withCredentials: true
        });
    }
}
