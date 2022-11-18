import React from 'react';
import {StyleSheet, View, ViewStyle, FlatList} from 'react-native';

import { Colors, Layout } from '../../styles';
import InputForItem from "./InputForItem";


export interface InputFieldData {
    title: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface InputContainerPrpops {
    inputFields: Array<InputFieldData>;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
    },
    inputField: {
        marginVertical: Layout.margins.small,
        marginHorizontal: Layout.margins.default
    }
});

export default function InputContainer(props: InputContainerPrpops) {
    return (
        <View style={props.style}>
            <View style={styles.imageContainer}>
                <FlatList
                    // scrollEnabled={false} TODO SectionList???
                    nestedScrollEnabled={true}
                    data={props.inputFields}
                    renderItem={({item}) => (
                        <InputForItem
                            style={styles.inputField}
                            title={item.title}
                            onChangeText={item.onChange}
                            value={item.value}
                        />
                    )}
                />
            </View>
        </View>
    );
}
