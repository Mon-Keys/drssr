import Auth, { ILoginData, ISignupData } from './api/auth';
import User, { IUserData, IUpdateUserData } from './api/user';
import Common, {
    IItemData,
    IClothesData,
    ILookData,
    IGetLookData
} from './api/common';
import Stylist from './api/stylist';

export {
    ILoginData,
    IUpdateUserData,
    IUserData,
    ISignupData,
    IItemData,
    IClothesData,
    ILookData,
    IGetLookData
};

export default {
    Auth: new Auth(),
    User: new User(),
    Common: new Common(),
    Stylist: new Stylist()
};
