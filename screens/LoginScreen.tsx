import React from 'react'
import { StyleSheet, Image } from 'react-native';
import InputField from '../components/InputField'

import { Text, View } from '../components/Themed';
import ImageMasker from '../components/ImageMasker';
import StyledButton from '../components/StyledButton';
import Person from '../components/icons/person'
import DatePicker from 'react-native-date-picker'
import { loginUser, selectUser } from '../reducers/userReducer';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ILoginData } from '../network';
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const [login, onChangeLogin] = React.useState<string>('');

  const [password, onChangePassword] = React.useState<string>('');
  const [date, setDate] = React.useState<Date>(new Date(343223543))
  const [open, setOpen] = React.useState<boolean>(false)

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const submitLogin = () => {
    const loginData: ILoginData = {
      login: login,
      password: password,
    }
    dispatch(loginUser(loginData)).then(() => {
      navigation.navigate("Profile")
    })
  }



  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <InputField
          icon={<Person />}
          placeholder={'имя пользователя'}
          value={login}
          onChangeText={onChangeLogin} />
        <InputField
          icon={<Person />}
          placeholder={'пароль'}
          value={password}
          onChangeText={onChangePassword}
          password={true} />

        <StyledButton
          title='войти' onPress={submitLogin} />

        <StyledButton
          title='зарегистрироваться' onPress={() => {
            navigation.navigate('Signup')
          }} />

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
