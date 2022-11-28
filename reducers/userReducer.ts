import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Api, { ILoginData, IUserData, ISignupData, IUpdateUserData } from '../network/';
import { IAvatarData } from '../network/api/user';

export interface User {
    nickname: string;
    email: string;
    name: string;
    avatar: string;
    stylist?: boolean;
    birthDate?: string;
    description?: string;
    ctime?: string;
}

interface UserState {
    isLoggedIn: boolean | null;
    userData: User;
    status: string;
    error: string;
}

const initialState = {
    isLoggedIn: null,
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

export const stylist = createAsyncThunk<IUserData>(
    'user/stylist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Auth.stylistUser();
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserData = createAsyncThunk<IUserData, IUpdateUserData>(
    'user/update',
    async (dataToUpdate, { rejectWithValue }) => {
        try {
            const response = await Api.User.updateUser(dataToUpdate);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addAvatar = createAsyncThunk<IUserData, IAvatarData>(
    'user/addAvatar', 
    async (data, { rejectWithValue }) => {
    try {
        const response = await Api.User.addAvatar(data);

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteAvatar = createAsyncThunk<IUserData>(
    'user/deleteAvatar', 
    async (data, { rejectWithValue }) => {
    try {
        const response = await Api.User.deleteAvatar();

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

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
                state.status = 'rejectedCookie';
                state.isLoggedIn = false;
            })
            .addCase(signUpUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
                state.isLoggedIn = true;
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
            })
            .addCase(stylist.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(stylist.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
            })
            .addCase(stylist.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
            })
            .addCase(updateUserData.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(addAvatar.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(addAvatar.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
            })
            .addCase(addAvatar.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(deleteAvatar.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(deleteAvatar.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userData = action.payload as unknown as User;
            })
            .addCase(deleteAvatar.rejected, (state) => {
                state.status = 'rejected';
            });
    }
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
