import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ButtonProps,
    Pressable,
    Text
} from 'react-native';
import Colors from '../../constants/Colors';

interface StyledButtonProps extends ButtonProps {}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.base.white,
        width: 288,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        color: Colors.base.black,
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