import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import DataService, { ILoginData, IUserData, ISignupData } from '../network/';

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
            console.log('fetching user data');
            const response = await DataService.getUserDataByCookie();
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk<ISignupData, ISignupData>(
    'user/signUpUser',
    async (signUpData, { rejectWithValue }) => {
        try {
            console.log('sending signup');
            const response = await DataService.signUpUser(signUpData);
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk<ILoginData, ILoginData>(
    'user/loginUser',
    async (loginData, { rejectWithValue }) => {
        try {
            console.log('sending login');
            const response = await DataService.loginUser(loginData);
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk<IUserData>(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            console.log('logout user');
            const response = await DataService.logoutUser();
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadData: (state) => {
            console.log('not done', state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                state.userData = action.payload as unknown as User;
                state.isLoggedIn = true;
                console.log(action);
                console.log(state.userData);
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
                // state.error = action.payload
            })
            .addCase(signUpUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                state.userData = action.payload as unknown as User;
            })
            .addCase(signUpUser.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
                // state.error = action.payload
            })

            .addCase(loginUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                state.userData = action.payload as unknown as User;
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
                // state.error = action.payload
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'resolved';
                state.isLoggedIn = false;
                state.userData = { nickname: '', email: '', name: '' };
                console.log('resolved');
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
                // state.error = action.payload
            });
    }
});

export const { loadData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
