import { StyleSheet, Button, GestureResponderEvent } from 'react-native';
import React from "react"
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import InputField from "../components/InputField"
import Person from '../components/icons/person'
import StyledButton from '../components/StyledButton';
import Colors from '../constants/Colors';

export default function LoginScreen() {

    const [nickname, onChangeNickname] = React.useState<string>('');

    const [email, onChangeEmail] = React.useState<string>('');

    const [password, onChangePassword] = React.useState<string>('');

    const [birthdate, onChangeBirthdate] = React.useState<string>('');

    const submitSignup = (event: GestureResponderEvent) => {
        alert("submitting")
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
