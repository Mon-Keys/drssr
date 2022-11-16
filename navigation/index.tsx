/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

/* eslint react/no-unstable-nested-components: 0 */ // --> OFF
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome,
    AntDesign
} from '@expo/vector-icons';
import Colors from '../styles/Colors';

import NotFoundScreenModal from '../screens/Modals/NotFoundScreenModal';
import Home from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/DiscoverScreen';
import WardrobeScreen from '../screens/WardrobeScreen/WardrobeScreen';
import SignupScreenModal from '../screens/Modals/SignupScreenModal';
import LoginScreen from '../screens/Modals/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import EditModal from '../screens/Modals/EditModal';
import ImageRecognizerScreen from '../screens/Modals/ImageRecognizer';
import AddItemModal from '../screens/Modals/AddItemModal';
import CreateLookModal from '../screens/Modals/CreateLookModal';
import PostModalScreen from '../screens/Modals/PostModal';
import SettingsModalScreen from '../screens/Modals/SettingsModal';
import { Theme } from '../styles';
import SaveLookModal from '../screens/Modals/SaveLookModal';
import ClothingByCategoryScreen from '../screens/WardrobeScreen/ItemsScreen/ClothingByCategoryScreen';
import ThingScreen from "../screens/WardrobeScreen/ItemsScreen/ThingScreen";

const styles = StyleSheet.create({
    iconAlignment: {
        marginBottom: -3
    },
    info: {
        marginRight: 15
    }
});

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors.base.black
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={({ navigation }: RootTabScreenProps<'Home'>) => ({
                    title: 'Home',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={28} color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Signup')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors.base.white}
                                style={styles.info}
                            />
                        </Pressable>
                    ),
                    headerShown: false
                })}
            />
            <BottomTab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="hearto" size={28} color={color} />
                    ),
                    headerShown: false,
                    tabBarLabel: () => null
                }}
            />
            <BottomTab.Screen
                name="Wardrobe"
                component={WardrobeScreen}
                options={{
                    title: 'Wardrobe',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="wardrobe"
                            size={28}
                            color={color}
                        />
                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={28} color={color} />
                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreenModal}
                options={{ title: 'Oops!' }}
            />
            <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen name="AddItem" component={AddItemModal} />
                <Stack.Screen name="Signup" component={SignupScreenModal} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Edit" component={EditModal} />
                <Stack.Screen name="Post" component={PostModalScreen} />
                <Stack.Screen name="ClothingByCategory" component={ClothingByCategoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Thing" component={ThingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={SettingsModalScreen} />
                <Stack.Screen
                    name="ImageRecognizer"
                    component={ImageRecognizerScreen}
                />

                <Stack.Screen name="CreateLook" component={CreateLookModal} />
                <Stack.Screen name="SaveLook" component={SaveLookModal} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default function Navigation({
    colorScheme
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? Theme.light : Theme.dark}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}
