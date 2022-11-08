import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View
} from 'react-native';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';


interface SearchBarProps extends Omit<TextInputProps, 'secureTextEntry'> {
    password?: boolean;
}

const styles = StyleSheet.create({
    input: {
        color: Colors.base.white,
        height: 40,
        fontFamily: 'proxima-nova',
        fontSize: 18,
        width: 230,
        paddingLeft: 9
    },
    inputContainer: {
        backgroundColor: Colors.base.dark,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 9,
        width: 288,
        height: 36
    }
});

const SearchBar = (props: SearchBarProps) => {
    return (
        <View style={styles.inputContainer}>
            <AntDesign name="search1" size={24} color={Colors.base.white} />
                <TextInput
                    placeholder={'Найди'}
                    style={styles.input}
                    selectionColor={Colors.base.white}
                    {...props}
                />
        </View>
    );
};

export default SearchBar;
