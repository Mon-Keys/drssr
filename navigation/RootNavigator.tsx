import AddItemModal from '../screens/WardrobeScreen/ItemsScreen/AddItemModal';
import SignupScreenModal from '../screens/Auth/SignupScreenModal';
import LoginScreen from '../screens/Auth/LoginScreen';
import PostModalScreen from '../screens/Modals/PostModal';
import ImageRecognizerScreen from '../screens/Modals/ImageRecognizer';
import CreateLookModal from '../screens/WardrobeScreen/LooksScreen/CreateLookModal';
import SaveLookModal from '../screens/WardrobeScreen/LooksScreen/SaveLookModal';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './TapBarNavigation/TapBar';
import NotFoundScreenModal from '../screens/Modals/NotFoundScreenModal';
import { useAppSelector } from '../hooks/useAppSelector';
import {fetchUserData, selectUser} from '../reducers/userReducer';
import {useAppDispatch} from "../hooks/useAppDispatch";
import StartScreen from "../screens/Auth/StartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setTimeout(() => dispatch(fetchUserData()), 1200);
    }, [dispatch]);

    const isLoggedIn = useAppSelector(selectUser).isLoggedIn;

    return (
        <Stack.Navigator>
            {isLoggedIn === null ? (
                <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
            ) : (isLoggedIn ? (
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
            ))}
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreenModal}
                options={{ title: 'Oops!' }}
            />
            <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen name="AddItem" component={AddItemModal} options={{
                    title: 'Добавить вещь',
                }} />
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
