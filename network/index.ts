import http from "./http-common";

interface ILoginData {
    login: string;
    password: string;
}

interface ISignupData {
    nickname: string;
    password: string;
    email: string;
    birth_date: string;
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
        return http.get<IUserData>("/users/private/")
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
        return http.post<ISignupData>("/users/public/signup", data)
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
        return http.post<ILoginData>("/users/public/login", data)
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
        return http.delete<any>("/users/private")
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
        return http.delete<any>("/users/private/logout")
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
        return http.put<IUpdateUserData>("/users/private/")
    }
}

export { ILoginData, IUpdateUserData, IUserData, ISignupData }

export default new DataService();