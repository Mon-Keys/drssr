import React from 'react';
import {
    StyleSheet,
    ButtonProps,
    Pressable,
    Text, ViewStyle
} from 'react-native';
import Colors from '../../styles/Colors';
import { Layout } from "../../styles";
import {View} from "./Themed";

interface StyledButtonProps extends ButtonProps {
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.base.black,
        borderRadius: Layout.cornerRadius,
    },
    buttonPressed: {
        backgroundColor: Colors.base.darkgray,
        borderRadius: Layout.cornerRadius,
    },
    buttonTitle: {
        textAlign: 'center',

        padding: Layout.margins.default,

        color: Colors.base.white,
        fontSize: Layout.fontSize.big,
        fontFamily: 'proxima-nova',
    }
});

const BaseButton = (props: StyledButtonProps) => {
    return (
        <Pressable onPress={props.onPress} style={props.style}>
            {({pressed}) => (
                <View style={pressed ? styles.buttonPressed : styles.button}>
                    <Text style={styles.buttonTitle}>{props.title}</Text>
                </View>
            )}
        </Pressable>
    );
};

export default BaseButton;
