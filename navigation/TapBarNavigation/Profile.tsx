import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import SettingsModalScreen from '../../screens/Modals/SettingsModal';

const Stack = createNativeStackNavigator();

export function ProfileNavigation(): any {
    return (
        <Stack.Navigator
            initialRouteName="ProfilePreview"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ProfilePreview" component={ProfileScreen} />
            <Stack.Screen
                name="Settings"
                component={SettingsModalScreen}
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    );
}
