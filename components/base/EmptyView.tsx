import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Layout } from '../../styles';

interface EmptyViewProps {
    textHeader?: string;
    text?: string;
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingBottom: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    textHeader: {
        fontSize: 24,
        color: Colors.base.black,
        fontWeight: '700',
        marginVertical: Layout.margins.default
    },
    text: {
        color: Colors.base.darkgray,
        maxWidth: 300,
        textAlign: 'center'
    }
});

const EmptyView = (props: EmptyViewProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>{props.textHeader}</Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

export default EmptyView;
