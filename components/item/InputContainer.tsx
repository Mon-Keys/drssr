import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, Layout } from '../../styles';
import InputForItem from './InputForItem';

export interface InputFieldData {
    key: string;
    title: string;
    value?: string | '';
    // onChange?: React.Dispatch<React.SetStateAction<string | undefined>>;
    onChange?: ((text: string) => void) | undefined;
    placeholder?: string | '';
    required?: boolean | false;
    validationFunc?: ((text: string) => string) | undefined;
    errorMsg?: string | '';
}

export function updateValue(
    array: Array<InputFieldData>,
    key: string,
    value: string
) {
    const idx = array.findIndex((item) => item.key === key);
    if (idx !== -1) {
        array[idx].value = value;
    }
}

export function getValue(array: Array<InputFieldData>, key: string): string {
    const data = array.find((item) => item.key === key);
    if (data && data.value) {
        return data.value.trim();
    }
    return '';
}

// return true - all fields is valid
export function checkValidation(array: Array<InputFieldData>): boolean {
    array.forEach((item) => {
        if (
            item.errorMsg !== '' ||
            (item.required && item.value?.trim() === '')
        ) {
            return false;
        }
    });
    return true;
}

export interface InputContainerPrpops {
    inputFields: Array<InputFieldData>;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        paddingVertical: Layout.margins.small
    },
    inputField: {
        marginHorizontal: Layout.margins.default
    }
});

export default function InputContainer(props: InputContainerPrpops) {
    props.inputFields.forEach((item) => {
        //@ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [text, onChangeText] = React.useState(item.value);
        const [errorMsg, onChangeErrorMsg] = React.useState('');
        item.value = text;
        item.errorMsg = errorMsg;
        item.onChange = (text: string) => {
            onChangeText(text);
            if (item.validationFunc) {
                onChangeErrorMsg(item.validationFunc(text.trim()));
            }
        };
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
                            errorMsg={item.errorMsg}
                            multiline
                        />
                    );
                })}
            </View>
        </View>
    );
}
