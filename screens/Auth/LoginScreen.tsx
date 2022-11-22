import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import InputField from '../../components/base/InputField';

import { View } from '../../components/base/Themed';
import StyledButton from '../../components/base/StyledButton';
import Person from '../../components/icons/person';
import { loginUser } from '../../reducers/userReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ILoginData } from '../../network';
import { RootStackScreenProps } from '../../types';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.base.white
    },
    formContainer: {
        alignItems: 'center',
        height: 300,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        backgroundColor: Colors.base.white
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});

export default function TabTwoScreen({
    navigation
}: RootStackScreenProps<'Login'>) {
    const [login, onChangeLogin] = React.useState<string>('');

    const [password, onChangePassword] = React.useState<string>('');

    const dispatch = useAppDispatch();

    const submitLogin = () => {
        const loginData: ILoginData = {
            login: login.trim(),
            password: password.trim()
        };
        dispatch(loginUser(loginData));
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholderTextColor={Colors.base.darkgray}
                    placeholder={'Никнейм'}
                    value={login}
                    onChangeText={onChangeLogin}
                />
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholderTextColor={Colors.base.darkgray}
                    placeholder={'Пароль'}
                    value={password}
                    onChangeText={onChangePassword}
                    password={true}
                />

                <StyledButton title="Войти" onPress={submitLogin} />

                <StyledButton
                    title="Зарегистрироваться"
                    onPress={() => {
                        navigation.navigate('Signup');
                    }}
                />
            </View>
        </View>
    );
}
