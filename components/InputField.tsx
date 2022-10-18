import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import Colors from "../constants/Colors"

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState<string>('Useless Text');
    const [number, onChangeNumber] = React.useState<string>('');

    return (
        <SafeAreaView>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        color: Colors.base.white,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.base.blue,
        borderRadius: 10,
    },
});

export default UselessTextInput;
