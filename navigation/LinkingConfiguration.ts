/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Home: {
                        screens: {
                            Home: 'home'
                        }
                    },
                    Search: {
                        screens: {
                            TabTwoScreen: 'search'
                        }
                    },
                    Wardrobe: {
                        screens: {
                            TabThreeScreen: 'wardrobe',
                            ClothingByCategory: 'ClothingByCategory', // пока нихуя не понимаю куда че писать
                        },
                    },
                    Profile: {
                        screens: {
                            ProfileScreen: 'profile'
                        }
                    }
                }
            },
            Edit: 'Edit',
            ImageRecognizer: 'ImageRecognizer',
            Signup: 'Signup',
            Login: 'Login',
            NotFound: '*',
            AddItem: 'AddItem',
            CreateLook: 'CreateLook',
            SaveLook: 'SaveLook',
            Post: 'Post'
            // ClothingByCategory: 'ClothingByCategory' TODO ебу пока куда это писать
        }
    }
};

export default linking;
