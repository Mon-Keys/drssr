export enum ClothingType {
    Sneakers,
    TShirt,
    Dress,
    Pants,
    Jeans
}

export interface StorePrice {
    storeName: string;
    storePrice: string;
    storeInStock: boolean;
}

export interface Item {
    name: string;
    store: Array<StorePrice>;
    image: string;
    imageURI: string;
    maskURI: string;
    type: ClothingType;
    dateAdded?: Date;
}
