import WardrobeScreen from '../../screens/WardrobeScreen/WardrobeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemsByCategoryScreen from '../../screens/WardrobeScreen/ItemsScreen/ItemsByCategoryScreen';
import * as React from 'react';
import ItemScreen from '../../screens/WardrobeScreen/ItemsScreen/ItemScreen';

const Stack = createNativeStackNavigator();

export function Wardrobe(): any {
    return (
        <Stack.Navigator
            initialRouteName="Wardrobe"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Wardrobe" component={WardrobeScreen} />
            <Stack.Screen
                name="ItemsByCategory"
                component={ItemsByCategoryScreen}
            />
            <Stack.Screen name="Item" component={ItemScreen} />
        </Stack.Navigator>
    );
}
