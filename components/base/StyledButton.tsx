import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ButtonProps,
    Pressable,
    Text
} from 'react-native';
import Colors from '../../styles/Colors';

interface StyledButtonProps extends ButtonProps {}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.base.black,
        width: 288,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        color: Colors.base.white,
        fontSize: 18,
        fontFamily: 'proxima-nova'
    }
});

const StyledButton = (props: StyledButtonProps) => {
    return (
        <SafeAreaView>
            <Pressable style={styles.button} {...props}>
                <Text style={styles.buttonTitle}> {props.title} </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default StyledButton;
