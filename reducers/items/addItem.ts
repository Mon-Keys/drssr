import { createAsyncThunk } from "@reduxjs/toolkit";
import Api, { IClothesData, IItemData } from "../../network";
import { PrepareClothesResponse } from "./clothesReducer";


export const prepareClothes = createAsyncThunk<PrepareClothesResponse, IItemData>(
    'items/prepareClothes',
    async (data, { rejectWithValue }) => {
        try {
            const response = await Api.Common.checkImage(data);

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const addClothes = createAsyncThunk<IClothesData, IItemData>(
    'items/addClothes',
    async (data, { rejectWithValue }) => {
        try {
            const response = await Api.Common.updateClothes(data);

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
