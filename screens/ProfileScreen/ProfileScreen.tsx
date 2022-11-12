import React, { useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Platform,
    StatusBar
} from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchUserData, selectUser } from '../../reducers/userReducer';
import { RootTabScreenProps } from '../../types';
import Colors from '../../styles/Colors';
import { ProfileCard } from '../../components/base/ProfileCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
        dispatch(fetchUserData()).then(() => {
            if (!isLoggedIn) navigation.navigate('Login');
        });
    }, [dispatch, isLoggedIn, navigation]);

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
                <ProfileCard
                    avatarSrc={
                        'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                    }
                    name={userData.name}
                    isVerified={userData.stylist || false}
                    subscribersAmount={3500}
                    location={'Москва'}
                    settingsAction={() => {
                        navigation.navigate('Settings');
                    }}
                    shareAction={() => {}}
                    description={
                        'Сотворю твой успех с помощью 100+ огненных образов. Моими капсулами пользуются более 2500 девушек — присоединяйся и ты!'
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
}