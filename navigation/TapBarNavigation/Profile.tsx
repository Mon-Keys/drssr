import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import SettingsModalScreen from "../../screens/Modals/SettingsModal";


const Stack = createNativeStackNavigator();

export function Profile(): any {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
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
