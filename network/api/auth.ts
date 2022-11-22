import http from '../instace';

export interface ILoginData {
    login: string;
    password: string;
}

export interface ISignupData {
    nickname: string;
    password: string;
    email: string;
    birth_date?: Date;
    name?: string;
    description?: string;
    avatar?: string; // [Base64]
}

export default class Auth {
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
     * Removes user session
     * @remarks
     * This method is part of the network subsystem.
     *
     * @beta
     */
     stylistUser() {
        return http.post<any>('/private/users/stylist', {
            withCredentials: true
        });
    }
}
