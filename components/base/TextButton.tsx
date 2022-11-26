import React from 'react';
import {
    StyleSheet,
    ButtonProps,
    Pressable,
    Text,
    ViewStyle
} from 'react-native';
import Colors from '../../styles/Colors';
import { Layout } from '../../styles';
import { View } from './Themed';

interface StyledButtonProps extends ButtonProps {
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    button: {
        borderRadius: Layout.cornerRadius
    },
    buttonTitle: {
        textAlign: 'center',

        padding: Layout.margins.small,

        color: Colors.base.black,
        fontSize: Layout.fontSize.big,
        fontFamily: 'proxima-nova',

        fontWeight: 'bold',
    }
});

const TextButton = (props: StyledButtonProps) => {
    return (
        <Pressable onPress={props.onPress} style={props.style}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>{props.title}</Text>
            </View>
        </Pressable>
    );
};

export default TextButton;
