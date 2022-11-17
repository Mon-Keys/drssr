import React from 'react';
import { StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { View } from '../../components/base/Themed';
import StyledButton from '../../components/base/StyledButton';
import { logoutUser } from '../../reducers/userReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ProfileCard } from '../../components/base/ProfileCard';
import { RootStackScreenProps } from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    }
});

export default function SettingsModalScreen({
    navigation
}: RootStackScreenProps<'Settings'>) {
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <View style={styles.container}>
            <ProfileCard
                avatarSrc={
                    'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                }
                name={'test'}
                isVerified={true}
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

            <Text style={{ color: 'white' }}>aga</Text>
            <StyledButton title={'logout'} onPress={logout} />
            <StyledButton
                title={'log in'}
                onPress={() => {
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
}
