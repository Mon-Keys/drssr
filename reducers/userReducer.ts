import { createSlice, PayloadAction, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";
import DataService from "../network/"

export interface User {
    nickname: string;
    email: string;
    name: string;
    avatarURI: string;
    stylist: boolean;
    birthDate: string;
    description: string;
    ctime: string;
}

interface UserState {
    isLoggedIn: boolean;
    userData: User;
}

const initialState = {
    isLoggedIn: false,
    userData: {},
} as UserState;


export const fetchUserData = createAsyncThunk('user/privateData', async () => {
    const response = await DataService.getUserDataByCookie();
    return response.data
})


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadData: (state) => {
            console.log("not done",state);
        },
    },
});

export const { loadData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
