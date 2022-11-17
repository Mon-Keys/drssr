import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList, RootTabScreenProps } from '../types';
import Colors from '../styles/Colors';
import Home from '../screens/HomeScreen/HomeScreen';
import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import SearchScreen from '../screens/SearchScreen/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import * as React from 'react';
import { WardrobeNavigation } from './WardrobeNavigation';

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

export function BottomTabNavigator() {
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
                component={WardrobeNavigation}
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
