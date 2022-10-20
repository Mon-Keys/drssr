import React from 'react'
import { StyleSheet, Image } from 'react-native';
import InputField from '../components/InputField'

import { Text, View } from '../components/Themed';
import ImageMasker from '../components/ImageMasker';
import StyledButton from '../components/StyledButton';
import Person from '../components/icons/person'

export default function TabTwoScreen() {
  const [login, onChangeLogin] = React.useState<string>('');

  const [password, onChangePassword] = React.useState<string>('');

  const submitLogin = () => {
    alert("hello")
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
          title='hello' onPress={submitLogin} />
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
