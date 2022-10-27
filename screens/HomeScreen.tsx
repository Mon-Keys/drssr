import React from 'react';

import { StyleSheet, Button } from 'react-native';

import { View } from '../components/Themed';
import { MonoText } from '../components/StyledText';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { selectCount, increment, decrement } from '../reducers';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

export default function Home(/*{ navigation }: RootTabScreenProps<'Home'>*/) {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    // const incrementValue = Number(incrementAmout) || 0;

    return (
        <View style={styles.container}>
            <MonoText> {`current val: ${count}`}</MonoText>
            <Button
                title="-"
                onPress={() => {
                    console.log('minus');
                    dispatch(decrement());
                }}
            />
            <Button
                title="+"
                onPress={() => {
                    console.log('plus');
                    dispatch(increment());
                }}
            />
        </View>
    );
}
