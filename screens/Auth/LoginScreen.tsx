import React from 'react';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import InputField from '../../components/base/InputField';
import { nameRegExp, passwordRegExp } from '../../constants/validation';
import { View } from '../../components/base/Themed';
import StyledButton from '../../components/base/StyledButton';
import Person from '../../components/icons/person';
import Key from '../../components/icons/key';
import { loginUser, selectUser } from '../../reducers/userReducer';
import { useAppSelector } from '../../hooks/useAppSelector';
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
    const user = useAppSelector(selectUser);

    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [loginValid, setLoginValid] = React.useState<boolean>(true);
    const [passwordValid, setPasswordValid] = React.useState<boolean>(true);

    const dispatch = useAppDispatch();

    const submitLogin = () => {
        const loginData: ILoginData = {
            login: login.trim(),
            password: password.trim()
        };
        setLoginValid(nameRegExp.test(login));
        setPasswordValid(passwordRegExp.test(password));
        if (nameRegExp.test(login) && passwordRegExp.test(password)) {
            dispatch(loginUser(loginData));
        }
    };

    const onChangeLogin = (text: string) => {
        setLogin(text);
        setLoginValid(nameRegExp.test(text));
    };

    const onChangePassword = (text: string) => {
        setPassword(text);
        setPasswordValid(passwordRegExp.test(text));
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
                    valid={loginValid}
                    errorText={'Неверный формат никнейма'}
                />
                <InputField
                    icon={<Key />}
                    placeholderTextColor={Colors.base.darkgray}
                    placeholder={'Пароль'}
                    value={password}
                    onChangeText={onChangePassword}
                    password={true}
                    valid={passwordValid}
                    errorText={'Пароль должен состоять из 8-20 латинских букв'}
                />

                {user.status === 'rejected' && (
                    <Text
                        style={{
                            color: 'red',
                            textAlign: 'center',
                            maxWidth: 300
                        }}
                    >
                        Неверный логин или пароль
                    </Text>
                )}
                {user.status !== 'rejected' && (
                    <Text style={{ textAlign: 'center', maxWidth: 300 }}></Text>
                )}

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
