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
import { fetchUserData, selectUser } from '../reducers/userReducer';
import { useAppDispatch } from '../hooks/useAppDispatch';
import StartScreen from '../screens/Auth/StartScreen';
import LookScreen from '../screens/WardrobeScreen/LooksScreen/LookScreen';
import LooksForNewPostModal from '../screens/Modals/LooksForNewPostModal';
import CreatePostModal from '../screens/Modals/CreatePostModal';
import EditLookModal from '../screens/Modals/EditLookModal';
import SaveEditLookModal from '../screens/Modals/SaveEditLookModal';
import ItemModal from "../screens/Modals/ItemModal";

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
                <Stack.Screen
                    name="Start"
                    component={StartScreen}
                    options={{ headerShown: false }}
                />
            ) : isLoggedIn ? (
                <Stack.Screen
                    name="Root"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ title: 'Вход в аккаунт' }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreenModal}
                        options={{ title: 'Регистрация' }}
                    />
                </>
            )}
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreenModal}
                options={{ title: 'Oops!' }}
            />
            <Stack.Group screenOptions={{ presentation: 'card' }}>
                <Stack.Screen
                    name="AddItem"
                    component={AddItemModal}
                    options={{
                        title: 'Добавить вещь'
                    }}
                />
                <Stack.Screen
                    name="Post"
                    component={PostModalScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ImageRecognizer"
                    component={ImageRecognizerScreen}
                />
                <Stack.Screen name="EditLook" component={EditLookModal} />
                <Stack.Screen
                    name="CreateLook"
                    component={CreateLookModal}
                    options={{ title: 'Создание образа' }}
                />
                <Stack.Screen
                    name="SaveLook"
                    component={SaveLookModal}
                    options={{ title: 'Создание образа' }}
                />
                <Stack.Screen
                    name="FinishEditLook"
                    component={SaveEditLookModal}
                    options={{ title: 'Сохранение изменений' }}
                />
                <Stack.Screen
                    name="Look"
                    component={LookScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Item"
                    component={ItemModal}
                    options={{ title: 'Вещь' }}
                />
                <Stack.Screen
                    name="LooksForNewPost"
                    component={LooksForNewPostModal}
                    options={{ title: 'Выберете образ' }}
                />
                <Stack.Screen
                    name="CreatePost"
                    component={CreatePostModal}
                    options={{ title: 'Новая публикация' }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}
