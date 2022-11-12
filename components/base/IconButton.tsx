import React from 'react';
import {
    View,
    StyleSheet,
    ButtonProps,
    Pressable,
} from 'react-native';

import Colors from '../../constants/Colors';
import { AntDesign } from "@expo/vector-icons";

interface StyledButtonProps extends ButtonProps {
    size?: number | 12,
}

const styles = StyleSheet.create({
    button: {
    },
    defaultIcon: {
        color: Colors.base.darkgray,
    }
});

const IconButton = (props: StyledButtonProps) => {
    return (
        <View style={styles.button}>
            <Pressable onPress={props.onPress}>
                <AntDesign
                    name='pluscircle'
                    size={props.size}
                    color={props.color ? props.color : styles.defaultIcon.color}
                />
            </Pressable>
        </View>
    )
};

export default IconButton;
