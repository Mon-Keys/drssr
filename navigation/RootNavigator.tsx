import AddItemModal from "../screens/Modals/AddItemModal";
import SignupScreenModal from "../screens/Auth/SignupScreenModal";
import LoginScreen from "../screens/Auth/LoginScreen";
import EditModal from "../screens/Modals/EditModal";
import PostModalScreen from "../screens/Modals/PostModal";
import ImageRecognizerScreen from "../screens/Modals/ImageRecognizer";
import CreateLookModal from "../screens/Modals/CreateLookModal";
import SaveLookModal from "../screens/Modals/SaveLookModal";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { BottomTabNavigator } from "./TapBarNavigation/TapBar";
import NotFoundScreenModal from "../screens/Modals/NotFoundScreenModal";
import { selectUser } from "../reducers/userReducer";
import { useAppSelector } from "../hooks/useAppSelector";


const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const isLoggedIn = useAppSelector(selectUser).isLoggedIn
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen
                    name="Root"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreenModal} />
                </>
            )}
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreenModal}
                options={{ title: 'Oops!' }}
            />
            <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen name="AddItem" component={AddItemModal} />
                <Stack.Screen name="Edit" component={EditModal} />
                <Stack.Screen name="Post" component={PostModalScreen} />
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
