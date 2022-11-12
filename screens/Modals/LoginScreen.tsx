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
        backgroundColor: 'transparent'
    },
    formContainer: {
        alignItems: 'center',
        height: 300,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
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
    // const [date, setDate] = React.useState<Date>(new Date(343223543));
    // const [open, setOpen] = React.useState<boolean>(false);

    // const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const submitLogin = () => {
        const loginData: ILoginData = {
            login: login,
            password: password
        };
        dispatch(loginUser(loginData)).then(() => {
            navigation.navigate('NotFound');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'имя пользователя'}
                    value={login}
                    onChangeText={onChangeLogin}
                />
                <InputField
                    icon={<Person color={Colors.base.darkgray} />}
                    placeholder={'пароль'}
                    value={password}
                    onChangeText={onChangePassword}
                    password={true}
                />

                <StyledButton title="войти" onPress={submitLogin} />

                <StyledButton
                    title="зарегистрироваться"
                    onPress={() => {
                        navigation.navigate('Signup');
                    }}
                />
            </View>
        </View>
    );
}
