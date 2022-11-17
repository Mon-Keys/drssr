import {
    StyleSheet,
    ActivityIndicator,
    Platform,
    StatusBar
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
import { selectUser, signUpUser } from '../../reducers/userReducer';
import { ISignupData } from '../../network';

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

export default function SignupScreenModal({
    navigation
}: RootStackScreenProps<'Signup'>) {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // const [date, setDate] = React.useState<Date>(new Date(343223543));
    // const [open, setOpen] = React.useState<boolean>(false);

    const [nickname, onChangeNickname] = React.useState<string>('');

    const [email, onChangeEmail] = React.useState<string>('');

    const [password, onChangePassword] = React.useState<string>('');

    const [birthdate, onChangeBirthdate] = React.useState<string>('');

    const submitSignup = () => {
        const data: ISignupData = {
            nickname: nickname,
            password: password,
            email: email,
            birth_date: new Date(),
            name: 'test',
            description: 'test user'
        };

        dispatch(signUpUser(data));
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'имя пользователя'}
                    placeholderTextColor={Colors.base.darkgray}
                    value={nickname}
                    onChangeText={onChangeNickname}
                />
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'почта'}
                    placeholderTextColor={Colors.base.darkgray}
                    value={email}
                    onChangeText={onChangeEmail}
                    keyboardType={'email-address'}
                />
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'пароль'}
                    value={password}
                    placeholderTextColor={Colors.base.darkgray}
                    onChangeText={onChangePassword}
                    password={true}
                />
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'дата рождения'}
                    value={birthdate}
                    placeholderTextColor={Colors.base.darkgray}
                    onChangeText={onChangeBirthdate}
                />
                <StyledButton
                    title="Зарегистрироваться"
                    onPress={submitSignup}
                />

                <StyledButton
                    title="Войти"
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                />
                {user.status === 'pending' ? (
                    <ActivityIndicator
                        size={'large'}
                        color={Colors.base.black}
                    />
                ) : (
                    <View />
                )}
            </View>
        </View>
    );
}
