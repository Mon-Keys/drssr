import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import {
    nameRegExp,
    passwordRegExp,
    emailRegExp
} from '../../constants/validation';
import React from 'react';
import { View } from '../../components/base/Themed';
import InputField from '../../components/base/InputField';
import Person from '../../components/icons/person';
import Key from '../../components/icons/key';
import Mail from '../../components/icons/mail';
import StyledButton from '../../components/base/StyledButton';
import Colors from '../../styles/Colors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginUser, selectUser, signUpUser } from '../../reducers/userReducer';
import { ISignupData } from '../../network';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.base.white,

        justifyContent: 'space-around'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },

    inp: {
        marginBottom: 48
    }
});

export default function SignupScreenModal(/*{
    navigation
}: RootStackScreenProps<'Signup'>*/) {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [nickname, setNickname] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [repeatPassword, setRepeatPassword] = React.useState<string>('');

    const [nicknameValid, setNicknameValid] = React.useState<boolean>(true);
    const [emailValid, setEmailValid] = React.useState<boolean>(true);
    const [passwordValid, setPasswordValid] = React.useState<boolean>(true);
    const [repeatPasswordValid, setRepeatPasswordValid] =
        React.useState<boolean>(true);

    const onChangeNickname = (text: string) => {
        setNickname(text);
        setNicknameValid(nameRegExp.test(text));
    };

    const onChangeEmail = (text: string) => {
        setEmail(text);
        setEmailValid(emailRegExp.test(text));
    };

    const onChangePassword = (text: string) => {
        setPassword(text);
        setPasswordValid(passwordRegExp.test(text));
    };

    const onChangeRepeatPassword = (text: string) => {
        setRepeatPassword(text);
        setRepeatPasswordValid(text === password);
    };

    const submitSignup = () => {
        const data: ISignupData = {
            nickname: nickname.trim(),
            password: password.trim(),
            email: email.trim(),
            birth_date: new Date(),
            name: 'test',
            description: 'test user'
        };

        setNicknameValid(nameRegExp.test(nickname));
        setEmailValid(emailRegExp.test(email));
        setPasswordValid(passwordRegExp.test(password));
        setRepeatPasswordValid(repeatPassword === password);
        if (
            nameRegExp.test(nickname) &&
            emailRegExp.test(email) &&
            passwordRegExp.test(password) &&
            repeatPassword === password
        ) {
            dispatch(signUpUser(data)).then(() => {
                dispatch(
                    loginUser({
                        login: data.nickname,
                        password: data.password
                    })
                );
            });
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}
            />
            <View
                style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}
            />
            <View
                style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}
            />
            <InputField
                icon={<Person color={Colors.base.darkgray} />}
                placeholder={'Никнейм'}
                placeholderTextColor={Colors.base.darkgray}
                value={nickname}
                onChangeText={onChangeNickname}
                valid={nicknameValid}
                errorText={'Неверный формат никнейма'}
            />
            <InputField
                icon={<Mail />}
                placeholder={'Почта'}
                placeholderTextColor={Colors.base.darkgray}
                value={email}
                onChangeText={onChangeEmail}
                keyboardType={'email-address'}
                valid={emailValid}
                errorText={'Неверный формат почты'}
            />
            <InputField
                icon={<Key />}
                placeholder={'Пароль'}
                value={password}
                placeholderTextColor={Colors.base.darkgray}
                onChangeText={onChangePassword}
                password={true}
                valid={passwordValid}
                errorText={'Неверный формат пароля'}
            />
            <InputField
                icon={<Key />}
                placeholder={'Повторите пароль'}
                value={repeatPassword}
                placeholderTextColor={Colors.base.darkgray}
                onChangeText={onChangeRepeatPassword}
                password={true}
                valid={repeatPasswordValid}
                errorText={'Пароли не совпадают'}
            />
            {user.status === 'rejected' && (
                <Text
                    style={{ color: 'red', textAlign: 'center', maxWidth: 300 }}
                >
                    Такая почта уже существует{' '}
                </Text>
            )}
            {user.status !== 'rejected' && (
                <Text style={{ textAlign: 'center', maxWidth: 300 }}></Text>
            )}
            <View style={{ marginTop: 21 }}>
                <StyledButton
                    title="Зарегистрироваться"
                    onPress={submitSignup}
                />
            </View>
            {user.status === 'pending' ? (
                <ActivityIndicator size={'large'} color={Colors.base.black} />
            ) : (
                <View />
            )}
            <View
                style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}
            />
        </View>
    );
}
