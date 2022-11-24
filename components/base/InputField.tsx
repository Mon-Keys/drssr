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

import EyeSlash from '../icons/eyeSlash';
import Eye from '../icons/eye';

interface InputFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
    password?: boolean;
    valid: boolean;
    icon: JSX.Element;
    errorText: string;
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
        backgroundColor: Colors.base.lightgray,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 9,
        width: 288,
        height: 36
    },
    errorInputContainer: {
        backgroundColor: Colors.base.lightgray,
        borderColor: Colors.base.red,
        borderWidth: 1,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 9,
        width: 288,
        height: 36
    }
});

const InputField = (props: InputFieldProps) => {
    const [hidePass, setHidePass] = useState<boolean | undefined>(
        props.password
    );

    function changeHidePass() {
        setHidePass(!hidePass);
    }

    let hidePassIcon: JSX.Element = <View />;
    if (props.password) {
        hidePassIcon = hidePass ? (
            <Eye onPress={changeHidePass} color={Colors.base.black} />
        ) : (
            <EyeSlash onPress={changeHidePass} color={Colors.base.black} />
        );
    }

    let icon: JSX.Element = <View />;
    if (props.icon) {
        icon = props.icon;
    }

    return (
        <SafeAreaView>
            <View style={props.valid ? styles.inputContainer : styles.errorInputContainer}>
                {icon}
                <TextInput
                    style={styles.input}
                    selectionColor={Colors.base.black}
                    {...props}
                    secureTextEntry={hidePass}
                />
                {hidePassIcon}
            </View>
            {!props.valid && 
                <Text style={{color: 'red', textAlign: 'center', maxWidth: 300}}>{props.errorText}</Text>
            }
            {props.valid && 
                <Text style={{textAlign: 'center', maxWidth: 300}}></Text>
            }
        </SafeAreaView>
    );
};

export default InputField;
