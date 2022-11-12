import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Colors, Layout } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

interface SearchBarProps extends Omit<TextInputProps, 'secureTextEntry'> {
    password?: boolean;
}

const styles = StyleSheet.create({
    input: {
        color: Colors.base.black,
        height: 40,
        fontFamily: 'proxima-nova',
        fontSize: 18,
        width: 230,
        paddingLeft: 9
    },
    inputContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.margins.default,
        width: 288,
        height: 36
    }
});

const SearchBar = (props: SearchBarProps) => {
    return (
        <View style={styles.inputContainer}>
            <AntDesign name="search1" size={24} color={Colors.base.darkgray} />
            <TextInput
                placeholder={'Найди'}
                style={styles.input}
                selectionColor={Colors.base.black}
                {...props}
            />
        </View>
    );
};

export default SearchBar;
