import React from 'react';
import {StyleSheet, View, ViewStyle, FlatList, ScrollView} from 'react-native';

import { Colors, Layout } from '../../styles';
import InputForItem from "./InputForItem";


export interface InputFieldData {
    key: string;
    title: string;
    value?: string | '';
    onChange?: React.Dispatch<React.SetStateAction<string | undefined>>;
    placeholder?: string | '';
}

export function updateValue(array: Array<InputFieldData>, key: string, value: string) {
    const idx = array.findIndex((item) => item.key == key);
    if (idx != -1) {
        array[idx].value = value;
    }
}

export function getValue(array: Array<InputFieldData>, key: string) {
    const data = array.find((item) => item.key == key);
    if (data) {
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
        borderRadius: Layout.cornerRadius,
    },
    inputField: {
        marginVertical: Layout.margins.small,
        marginHorizontal: Layout.margins.default
    }
});

export default function InputContainer(props: InputContainerPrpops) {
    props.inputFields.forEach((item) => {
        const [text, onChangeText] = React.useState(item.value);
        item.value = text;
        item.onChange = onChangeText;
    })
    return (
        <View style={props.style}>
            <View style={styles.imageContainer}>
                <ScrollView>
                    <View>
                        {props.inputFields.map((item) => {
                            return (
                                <InputForItem
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
                </ScrollView>
            </View>
        </View>
    );
}
