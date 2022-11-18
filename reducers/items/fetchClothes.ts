import {createAsyncThunk} from "@reduxjs/toolkit";
import Api, {IClothesData} from "../../network";

export const fetchUsersClothes = createAsyncThunk<Array<IClothesData>>(
    'items/fetchUsersClothes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.Common.getClothes();

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
