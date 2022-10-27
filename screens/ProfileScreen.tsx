import React from 'react';
import {
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    SafeAreaView
} from 'react-native';

import { Text, View } from '../components/Themed';

import { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchUserData, selectUser, logoutUser } from '../reducers/userReducer';
import StyledButton from '../components/StyledButton';
import { RootStackParamList, RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function ProfileScreen({
    navigation
}: RootTabScreenProps<'Profile'>) {
    const [refreshing, setRefreshing] = React.useState(false);

    const { isLoggedIn, status, error, userData } = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello');

        dispatch(fetchUserData()).then(() => {
            if (!isLoggedIn) navigation.navigate('Login');
        });
    }, [dispatch]);

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
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50
                    }}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center'
    },
    userName: {
        fontSize: 18
    },
    userDescription: {
        fontSize: 16,
        color: Colors.base.darkgray
    }
});
