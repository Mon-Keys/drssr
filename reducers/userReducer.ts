import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { ILoginData, IUserData, ISignupData } from '../network/';

export interface User {
    nickname: string;
    email: string;
    name: string;
    avatarURI?: string;
    stylist?: boolean;
    birthDate?: string;
    description?: string;
    ctime?: string;
}

interface UserState {
    isLoggedIn: boolean;
    userData: User;
    status: string;
    error: string;
}

const initialState = {
    isLoggedIn: false,
    userData: {},
    status: '',
    error: ''
} as UserState;

export const fetchUserData = createAsyncThunk<IUserData>(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.User.getUser();
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk<ISignupData, ISignupData>(
    'user/signUpUser',
    async (signUpData, { rejectWithValue }) => {
        try {
            const response = await Api.Auth.signUpUser(signUpData);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk<ILoginData, ILoginData>(
    'user/loginUser',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await Api.Auth.loginUser(loginData);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk<IUserData>(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Auth.logoutUser();
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
                state.isLoggedIn = true;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(signUpUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
            })
            .addCase(signUpUser.rejected, (state) => {
                state.status = 'rejected';
                // state.error = action.payload
            })

            .addCase(loginUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'rejected';
                state.isLoggedIn = false;
                // state.error = action.payload
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoggedIn = false;
                state.status = 'pending';
                state.error = '';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = 'rejected';
            });
    }
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
