import React from 'react';
import { Text, TextProps } from './Themed';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'proxima-nova'
    }
});

export function MonoText(props: TextProps) {
    return <Text {...props} style={[props.style, { ...styles.textStyle }]} />;
}
