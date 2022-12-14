import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ViewStyle,
    TextInput,
    TextInputProps
} from 'react-native';

import { Colors, Layout } from '../../styles';

export interface InputFieldProps
    extends Omit<TextInputProps, 'secureTextEntry'> {
    title: string;
    value?: string;
    style?: ViewStyle;
    errorMsg?: string | '';
}

const styles = StyleSheet.create({
    title: {
        color: Colors.base.black,
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold'
    },
    input: {
        color: Colors.base.black,
        fontSize: Layout.fontSize.default
    },
    errorMsg: {
        color: Colors.base.red,
        fontSize: Layout.fontSize.small
    }
});

export default function InputForItem(props: InputFieldProps) {
    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput {...props} style={styles.input} />
            <Text style={styles.errorMsg}>{props.errorMsg}</Text>
        </View>
    );
}
