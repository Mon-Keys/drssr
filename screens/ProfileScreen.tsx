import React, { useEffect } from 'react';
import {
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
    SafeAreaView, Platform, StatusBar
} from 'react-native';

import { Text } from '../components/Themed';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchUserData, selectUser, logoutUser } from '../reducers/userReducer';
import StyledButton from '../components/StyledButton';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        backgroundColor: Colors.base.black,
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    userName: {
        fontSize: 18
    },
    userDescription: {
        fontSize: 16,
        color: Colors.base.darkgray
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
});

export default function ProfileScreen({
    navigation
}: RootTabScreenProps<'Profile'>) {
    const [refreshing] = React.useState(false);

    const { isLoggedIn, userData } = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello');

        dispatch(fetchUserData()).then(() => {
            if (!isLoggedIn) navigation.navigate('Login');
        });
    }, [dispatch, isLoggedIn, navigation]);

    const logout = () => {
        dispatch(logoutUser());
    };

    const refresh = () => {
        console.log('refresh');
        dispatch(fetchUserData());
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                }
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                    }}
                />
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userName}>{userData.nickname}</Text>
                <Text style={styles.userName}>{userData.email}</Text>

                <Text style={styles.userDescription}>{userData.email}</Text>
                <StyledButton title={'logout'} onPress={logout} />
                <StyledButton
                    title={'log in'}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
