import AddItemModal from "../screens/Modals/AddItemModal";
import SignupScreenModal from "../screens/Modals/SignupScreenModal";
import LoginScreen from "../screens/Modals/LoginScreen";
import EditModal from "../screens/Modals/EditModal";
import PostModalScreen from "../screens/Modals/PostModal";
import SettingsModalScreen from "../screens/Modals/SettingsModal";
import ImageRecognizerScreen from "../screens/Modals/ImageRecognizer";
import CreateLookModal from "../screens/Modals/CreateLookModal";
import SaveLookModal from "../screens/Modals/SaveLookModal";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { BottomTabNavigator } from "./TapBar";
import NotFoundScreenModal from "../screens/Modals/NotFoundScreenModal";


const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
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
