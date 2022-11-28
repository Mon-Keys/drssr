//@ts-nocheck
//@ts-ignore
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../network';
import { RootState } from '../../store';
import { ICreateLook } from '../../network/api/common';
import { ILook } from './looks';

// есть интерфейс ICreateLook он для пост запроса, их надо синхронизировать
interface CreateLookState {
    status: string;
    error: string;
    look: {
        img: string;
        clothes: Array<number>;
    };
}

const initialState = {
    status: '',
    error: '',
    look: {
        img: '',
        clothes: []
    }
} as CreateLookState;

export interface IupdateLook {
    look: ILook;
    id: number;
}

export const newLook = createAsyncThunk<ILook, ICreateLook>(
    'user/signUpUser',
    async (lookData, { rejectWithValue }) => {
        try {
            const response = await Api.Common.createNewLook(lookData);
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateLook = createAsyncThunk<ILook, IupdateLook>(
    'createLook/update',
    async (lookData, { rejectWithValue }) => {
        try {
            console.log(lookData.look.clothes)
            const response = await Api.Common.updateLook(
                lookData.look,
                lookData.id
            );
            if (response.status !== 200) {
                throw new Error(`Error, status ${response.status}`);
            }

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createLookSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        addLookPhoto: (state, action: PayloadAction<string>) => {
            state.look.img = action.payload;
        },
        addLookData: (state, action) => {
            state.look.clothes = action.payload;
            console.log(state.look.clothes);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newLook.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(newLook.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(newLook.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(updateLook.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateLook.fulfilled, (state) => {
                state.status = 'resolved';
            })
            .addCase(updateLook.rejected, (state) => {
                state.status = 'rejected';
            });
    }
});

export const { addLookPhoto, addLookData } = createLookSlice.actions;

export const selectCreateLook = (state: RootState) => state.createLook;

export default createLookSlice.reducer;
