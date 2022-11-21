import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, Layout } from '../../styles';
import InputForItem from './InputForItem';

export interface InputFieldData {
    key: string;
    title: string;
    value?: string | '';
    onChange?: React.Dispatch<React.SetStateAction<string | undefined>>;
    placeholder?: string | '';
}

export function updateValue(
    array: Array<InputFieldData>,
    key: string,
    value: string
) {
    const idx = array.findIndex((item) => item.key == key);
    if (idx != -1) {
        array[idx].value = value;
    }
}

export function getValue(array: Array<InputFieldData>, key: string): string {
    const data = array.find((item) => item.key == key);
    if (data && data.value) {
        return data.value;
    }
    return '';
}

export interface InputContainerPrpops {
    inputFields: Array<InputFieldData>;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius
    },
    inputField: {
        marginVertical: Layout.margins.small,
        marginHorizontal: Layout.margins.default
    }
});

export default function InputContainer(props: InputContainerPrpops) {
    props.inputFields.forEach((item) => {
        //@ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [text, onChangeText] = React.useState(item.value);
        item.value = text;
        item.onChange = onChangeText;
    });
    return (
        <View style={props.style}>
            <View style={styles.imageContainer}>
                {props.inputFields.map((item) => {
                    return (
                        <InputForItem
                            key={item.key}
                            style={styles.inputField}
                            title={item.title}
                            onChangeText={item.onChange}
                            value={item.value}
                            placeholder={item.placeholder}
                            placeholderTextColor={Colors.base.darkgray}
                        />
                    );
                })}
            </View>
        </View>
    );
}
