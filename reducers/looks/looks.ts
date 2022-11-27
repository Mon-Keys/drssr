export interface IClothesLookData {
    id: number;
    name: string;
    description: string;
    type: string;
    brand: string;
    coords: {
        x: number;
        y: number;
    };
}

export interface ILook {
    id: number;
    img_path: string;
    name?: string;
    description?: string;
    creator_id?: number;
    clothes?: Array<IClothesLookData>;
    img?: string;
    filename?: string;
}

export interface ILooks {
    LooksData: Array<ILook>;
    status: string;
    error: string;
}
