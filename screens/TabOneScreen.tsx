import { StyleSheet, Image, Button, GestureResponderEvent } from 'react-native';


import MaskedView from "@react-native-masked-view/masked-view";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { MonoText } from '../components/StyledText';

import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { selectCount, increment, decrement } from "../reducers"
import { useState } from 'react';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmout, setIncrementAmount] = useState<number>(2);

  const incrementValue = Number(incrementAmout) || 0;


  return (
    <View style={styles.container}>
      <MonoText> {`current val: ${count}`}</MonoText>
      <Button title='-' onPress={
        (e: GestureResponderEvent) => {
          console.log("minus")
          dispatch(decrement())
        }
      }></Button>
      <Button title='+' onPress={
        (e: GestureResponderEvent) => {
          console.log("plus")
          dispatch(increment())
        }
      }></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
