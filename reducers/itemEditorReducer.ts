import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as ImagePicker from "expo-image-picker";
import DataService, {IItemData, ISignupData} from "../network";
import axios from "axios";

export interface ItemResponse {
    id: number;
    type: string;
    color: string;
    img: string;
    brand: string;
    sex: string;
    mask: string;
}

interface ItemEditorState {
    currentItem?: ImagePicker.ImagePickerResult | null;
    status: string;
    itemResp: ItemResponse | null;
}



export const analyzeItem = createAsyncThunk<IItemData, IItemData>('itemEditor/analyze',
    async (data, {rejectWithValue}) => {
        try {
            console.log('sending signup11')
            const response = await DataService.checkImage(data)
            // console.log(data)
            console.log('sent')
            // console.log(response)

            return response.data
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.message)
        }
})

const initialState = {
    currentItem: null,
    status: "",
    itemResp: null
} as ItemEditorState;

export const itemEditorSlice = createSlice({
    name: "itemEditor",
    initialState,
    reducers: {
        choosePhoto: (state, action: PayloadAction<ImagePicker.ImagePickerResult>) => {
            state.itemResp = null
            state.currentItem = action.payload
        },
    },
     extraReducers: (builder) => {
        builder
            .addCase(analyzeItem.pending, (state, action) => {
                state.status = 'pending';
                console.log('pending')
                // state.error = '';
            })
            .addCase(analyzeItem.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved')
                // state.userData = action.payload as unknown as User
                // state.isLoggedIn = true
                const itemResp: ItemResponse = {
                    brand: action.payload.brand,
                    type: action.payload.type,
                    img: action.payload.img,
                    mask: action.payload.mask,
                    color: action.payload.color,
                    id: action.payload.id,
                    sex: action.payload.sex,
                }
                state.itemResp = itemResp
                // console.log(state.userData)

            })
            .addCase(analyzeItem.rejected, (state, action) => {
                state.status = 'rejected';
                console.log('rejected')
                // state.error = action.payload
            })
     }
});

export const { choosePhoto } = itemEditorSlice.actions;

export const selectItemEditor = (state: RootState) => state.itemEditor;

export default itemEditorSlice.reducer;
