import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as ImagePicker from "expo-image-picker";
import DataService, {ISignupData} from "../network";
import axios from "axios";


interface ItemEditorState {
    currentItem?: ImagePicker.ImagePickerResult | null
}


export const analyzeItem = createAsyncThunk<ItemData, ItemData>('itemEditor/analyze',
    async (data, {rejectWithValue}) => {
        try {
            console.log('sending signup')
            const response = await DataService.getUserDataByCookie()
            console.log(data)
            console.log(response)
            let bodyFormData = new FormData();

            let photo = { uri: data.file }

            bodyFormData.append('sex', 'male')
            bodyFormData.append('brand','prada')

            return response.data
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.message)
        }
})

const initialState = {
    currentItem: null
} as ItemEditorState;

export const itemEditorSlice = createSlice({
    name: "itemEditor",
    initialState,
    reducers: {
        choosePhoto: (state, action: PayloadAction<ImagePicker.ImagePickerResult>) => {
            console.log(action)
            state.currentItem = action.payload
        },
    },
});

export const { choosePhoto } = itemEditorSlice.actions;

export const selectItemEditor = (state: RootState) => state.itemEditor;

export default itemEditorSlice.reducer;
