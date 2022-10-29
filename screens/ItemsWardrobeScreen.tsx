import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default function ItemsWardrobeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>wardrobe items</Text>
        </View>
    );
}
