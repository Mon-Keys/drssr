/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeScreenProps,
    NavigatorScreenParams,
    RouteProp
} from '@react-navigation/native';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from '@react-navigation/native-stack';
import { IPost } from './reducers/posts/post';
import LooksForNewPostModal from './screens/Modals/LooksForNewPostModal';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Start: undefined;
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    ImageRecognizer: undefined;
    Signup: undefined;
    Login: undefined;
    Edit: undefined;
    AddItem: undefined;
    NotFound: undefined;
    CreateLook: undefined;
    SaveLook: undefined;
    Post: {
        post: IPost;
    };
    Settings: undefined;
    ItemsByCategory: {
        category: string;
    };
    ItemInWardrobe: {
        id: number;
    };
    Item: {
        id: number;
    };
    Look: {
        id: number;
    };
    LooksForNewPost: undefined;
    CreatePost: {
        type: string;
        id: number;
    };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    Wardrobe: undefined;
    Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;

export type RootNavigation = NativeStackNavigationProp<
    RootStackParamList,
    'Root'
>;

export type TapBarNavigation = NativeStackNavigationProp<
    RootTabParamList,
    'Home'
>;

export type ClothingByCategoryScreenRouteProp = RouteProp<
    RootStackParamList,
    'ItemsByCategory'
>;

export type PostRouteProp = RouteProp<RootStackParamList, 'Post'>;

export type ThingScreenRouteProp = RouteProp<RootStackParamList, 'Item'>;
export type LookRouteProp = RouteProp<RootStackParamList, 'Look'>;
export type CreatePostRouteProp = RouteProp<RootStackParamList, 'CreatePost'>;
