import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/base/Themed';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default function LooksWardrobeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> wardrobe </Text>
        </View>
    );
}
