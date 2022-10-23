import { StyleSheet, Button, GestureResponderEvent, ActivityIndicator } from 'react-native';
import React from "react"
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import InputField from "../components/InputField"
import Person from '../components/icons/person'
import StyledButton from '../components/StyledButton';
import Colors from '../constants/Colors';
import DatePicker from 'react-native-date-picker'
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchUserData, selectUser, signUpUser } from '../reducers/userReducer';
import { ISignupData } from '../network';

export default function SignupScreen({ navigation }: RootTabScreenProps<'Profile'>) {

    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [date, setDate] = React.useState<Date>(new Date(343223543))
    const [open, setOpen] = React.useState<boolean>(false)

    const [nickname, onChangeNickname] = React.useState<string>('');

    const [email, onChangeEmail] = React.useState<string>('');

    const [password, onChangePassword] = React.useState<string>('');

    const [birthdate, onChangeBirthdate] = React.useState<string>('');

    const submitSignup = (event: GestureResponderEvent) => {
        const data: ISignupData = {
            nickname: nickname,
            password: password,
            email: email,
            birth_date: new Date(),
            name: 'test',
            description: 'test user',
        }

        dispatch(signUpUser(data))
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    icon={<Person />}
                    placeholder={'имя пользователя'}
                    value={nickname}
                    onChangeText={onChangeNickname} />
                <InputField
                    icon={<Person />}
                    placeholder={'почта'}
                    value={email}
                    onChangeText={onChangeEmail}
                    keyboardType={"email-address"} />
                <InputField
                    icon={<Person />}
                    placeholder={'пароль'}
                    value={password}
                    onChangeText={onChangePassword}
                    password={true} />
                <InputField
                    icon={<Person />}
                    placeholder={'дата рождения'}
                    value={birthdate}
                    onChangeText={onChangeBirthdate} />
                <StyledButton
                    title='hello' onPress={submitSignup} />

                <StyledButton
                    title='login' onPress={()=> {
                        navigation.navigate("Login")
                }} />
                {user.status === 'pending' ? <ActivityIndicator size={"large"} color={Colors.base.purple} /> : <View />}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
    formContainer: {
        alignItems: 'center',
        // backgroundColor: Colors.base.red,
        height: 300,
        alignContent: "space-between",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

});
