import React from 'react';

import { Platform, StatusBar, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default function Home(/*{ navigation }: RootTabScreenProps<'Home'>*/) {
    return (
        <View style={styles.container}>
            <MonoText> home screen </MonoText>
        </View>
    );
}
