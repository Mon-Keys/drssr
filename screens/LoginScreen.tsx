import { StyleSheet, Button, GestureResponderEvent } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { selectCount, increment, decrement } from "../reducers"
import { useState } from 'react';


export default function LoginScreen({ navigation }: RootTabScreenProps<'LoginScreen'>) {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState<number>(2);

    const incrementValue = Number(incrementAmount) || 0;


    return (
        <View style={styles.container}>
          <Text> test </Text>
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
