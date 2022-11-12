import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Text, View } from '../../components/base/Themed';
import { RootStackScreenProps } from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
});

export default function NotFoundScreenModal({
    navigation
}: RootStackScreenProps<'NotFound'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This screen doesn't exist.</Text>
            <TouchableOpacity
                onPress={() => navigation.replace('Root')}
                style={styles.link}
            >
                <Text style={styles.linkText}>Go to home screen!</Text>
            </TouchableOpacity>
        </View>
    );
}
