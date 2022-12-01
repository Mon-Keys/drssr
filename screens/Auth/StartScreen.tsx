import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { View } from '../../components/base/Themed';
import { Colors, Layout } from '../../styles';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.lightgray
    },
    headerTitle: {
        fontSize: Layout.fontSize.header * 3,
        color: Colors.base.black
    },
    caption: {
        fontSize: Layout.fontSize.big,
        color: Colors.base.black,
        fontStyle: 'italic'
    }
});

export default function StartScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Pose</Text>
            <Text style={styles.caption}>Твой стиль</Text>
        </View>
    );
}
