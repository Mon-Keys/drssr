import http from '../instace';

export interface IUserData {
    nickname: string;
    email: string;
    avatar?: string;
    stylist: boolean;
    description?: string;
    ctime: number;
}

export interface IUpdateUserData {
    nickname: string;
    email: string;
    name: string;
    avatar: string; // [Base64]
    birth_date: string;
    description: string;
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
        return http.put<IUpdateUserData>('/private/users/', data);
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
}
