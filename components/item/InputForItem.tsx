import React from 'react';
import {StyleSheet, View, Text, ViewStyle, TextInput, TextInputProps} from 'react-native';

import { Colors, Layout } from '../../styles';

export interface InputFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
    title: string;
    value?: string;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    title: {
        color: Colors.base.black,
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold',
    },
    input: {
        color: Colors.base.darkgray,
        fontSize: Layout.fontSize.default,
    }
});

export default function InputForItem(props: InputFieldProps) {
    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    );
}
