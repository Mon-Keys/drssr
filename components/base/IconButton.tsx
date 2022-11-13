import React, { ReactElement } from 'react';
import { View, StyleSheet, ButtonProps, Pressable } from 'react-native';

import Colors from '../../styles/Colors';

interface StyledButtonProps extends ButtonProps {
    size?: number | 12;
    icon: ReactElement<any, any>;
}

const styles = StyleSheet.create({
    button: {},
    defaultIcon: {
        color: Colors.base.darkgray
    }
});

const IconButton = (props: StyledButtonProps) => {
    return (
        <View style={styles.button}>
            <Pressable onPress={props.onPress}>{props.icon}</Pressable>
        </View>
    );
};

export default IconButton;
