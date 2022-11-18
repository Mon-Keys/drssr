import React from 'react';
import {
    StyleSheet,
    ButtonProps,
    Pressable,
    Text, ViewStyle
} from 'react-native';
import Colors from '../../styles/Colors';
import { Layout } from "../../styles";

interface StyledButtonProps extends ButtonProps {
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    buttonTitle: {
        textAlign: 'center',

        borderRadius: Layout.cornerRadius,
        padding: Layout.margins.small,
        backgroundColor: Colors.base.black,

        color: Colors.base.white,
        fontSize: Layout.fontSize.big,
        fontFamily: 'proxima-nova',
    }
});

const BaseButton = (props: StyledButtonProps) => {
    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </Pressable>
    );
};

export default BaseButton;
