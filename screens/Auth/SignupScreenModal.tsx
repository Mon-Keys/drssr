import {
    StyleSheet,
    ActivityIndicator,
    Platform,
    StatusBar, KeyboardAvoidingView
} from 'react-native';
import React from 'react';
import { View } from '../../components/base/Themed';
import { RootStackScreenProps } from '../../types';
import InputField from '../../components/base/InputField';
import Person from '../../components/icons/person';
import StyledButton from '../../components/base/StyledButton';
import Colors from '../../styles/Colors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {fetchUserData, loginUser, selectUser, signUpUser} from '../../reducers/userReducer';
import { ISignupData } from '../../network';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.base.white,

        justifyContent: 'space-around',
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

export default function SignupScreenModal({
    navigation
}: RootStackScreenProps<'Signup'>) {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [nickname, onChangeNickname] = React.useState<string>('');

    const [email, onChangeEmail] = React.useState<string>('');

    const [password, onChangePassword] = React.useState<string>('');
    const [password2, onChangePassword2] = React.useState<string>('');

    const [birthdate, onChangeBirthdate] = React.useState<string>('');

    const submitSignup = () => {
        const data: ISignupData = {
            nickname: nickname.trim(),
            password: password.trim(),
            email: email.trim(),
            birth_date: new Date(),
            name: 'test',
            description: 'test user'
        };

        dispatch(signUpUser(data)).then(() => {
            dispatch(loginUser({
                login: data.nickname,
                password: data.password
            })); // TODO ващет бэк должен сразу куку сетить
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}/>
            <View style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}/>
            <View style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}/>
            <InputField
                icon={<Person color={Colors.base.darkgray} />}
                placeholder={'Никнейм'}
                placeholderTextColor={Colors.base.darkgray}
                value={nickname}
                onChangeText={onChangeNickname}
            />
            <InputField
                icon={<Person color={Colors.base.darkgray} />}
                placeholder={'Почта'}
                placeholderTextColor={Colors.base.darkgray}
                value={email}
                onChangeText={onChangeEmail}
                keyboardType={'email-address'}
            />
            <InputField
                icon={<Person color={Colors.base.darkgray} />}
                placeholder={'Пароль'}
                value={password}
                placeholderTextColor={Colors.base.darkgray}
                onChangeText={onChangePassword}
                password={true}
            />
            <InputField
                icon={<Person color={Colors.base.darkgray} />}
                placeholder={'Повторите пароль'}
                value={password2}
                placeholderTextColor={Colors.base.darkgray}
                onChangeText={onChangePassword2}
                password={true}
            />
            <View style={{ marginTop: 21 }}>
                <StyledButton
                    title="Зарегистрироваться"
                    onPress={submitSignup}
                />
            </View>
            {/*<StyledButton*/}
            {/*    title="Войти"*/}
            {/*    onPress={() => {*/}
            {/*        navigation.navigate('Login');*/}
            {/*    }}*/}
            {/*/>*/}
            {user.status === 'pending' ? (
                <ActivityIndicator
                    size={'large'}
                    color={Colors.base.black}
                />
            ) : (
                <View />
            )}
            <View style={{ maxHeight: 80, width: 5, backgroundColor: 'green' }}/>
        </View>
    );
}
