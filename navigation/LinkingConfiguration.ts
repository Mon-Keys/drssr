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
            Start: 'Start',
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
                            ItemsByCategory: 'ItemsByCategory'
                        }
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
            Post: 'Post',
            FinishEditLook: 'FinishEditLook'
        }
    }
};

export default linking;
