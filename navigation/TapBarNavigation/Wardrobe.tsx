import WardrobeScreen from '../../screens/WardrobeScreen/WardrobeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemsByCategoryScreen from '../../screens/WardrobeScreen/ItemsScreen/ItemsByCategoryScreen';
import * as React from 'react';
import ItemScreen from '../../screens/WardrobeScreen/ItemsScreen/ItemScreen';

const Stack = createNativeStackNavigator();

export function WardrobeNavigation(): any {
    return (
        <Stack.Navigator
            initialRouteName="Category"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Category" component={WardrobeScreen} />
            <Stack.Screen
                name="ItemsByCategory"
                component={ItemsByCategoryScreen}
            />
            <Stack.Screen name="ItemInWardrobe" component={ItemScreen} />
        </Stack.Navigator>
    );
}
