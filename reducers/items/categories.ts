import { createSelector } from "@reduxjs/toolkit";
import { selectUserItems } from "./clothesReducer";


export interface ClothingCategory {
    caption: string;
    img: string;
}

export const getCategories = createSelector(selectUserItems, (items) => {
    const categories = new Array<ClothingCategory>();
    const categoriesAvailable = new Set<string>();
    items.forEach((item) => {
        if (!categoriesAvailable.has(item.type)) {
            categoriesAvailable.add(item.type);
            categories.push({
                caption: item.type,
                img: item.mask_path
            });
        }
    });
    return categories;
});
