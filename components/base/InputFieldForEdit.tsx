import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    Text
} from 'react-native';
import Colors from '../../styles/Colors';

interface InputFieldForEditProps
    extends Omit<TextInputProps, 'secureTextEntry'> {}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 9,
        width: 300
    },
    input: {
        color: Colors.base.black,
        minHeight: 40,
        fontFamily: 'proxima-nova',
        fontSize: 18,
        width: 280,
        paddingLeft: 10
    }
});

const InputFieldForEdit = (props: InputFieldForEditProps) => {
    return (
        <SafeAreaView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    selectionColor={Colors.base.black}
                    {...props}
                />
            </View>
        </SafeAreaView>
    );
};

export default InputFieldForEdit;
