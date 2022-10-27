import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    TextInputProps,
    View
} from 'react-native';
import Colors from '../constants/Colors';

import EyeSlash from './icons/eyeSlash';
import Eye from './icons/eye';

interface InputFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
    password?: boolean;
    icon: JSX.Element;
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
            <Eye onPress={changeHidePass} />
        ) : (
            <EyeSlash onPress={changeHidePass} />
        );
    }

    let icon: JSX.Element = <View />;
    if (props.icon) {
        icon = props.icon;
        // icon.props.style = styles.icon
    }

    return (
        <SafeAreaView>
            <View style={styles.inputContainer}>
                {/* <Person style={styles.icon}></Person> */}
                {icon}
                <TextInput
                    style={styles.input}
                    selectionColor={Colors.base.white}
                    {...props}
                    secureTextEntry={hidePass}
                />
                {hidePassIcon}
            </View>
        </SafeAreaView>
    );
};

export default InputField;
