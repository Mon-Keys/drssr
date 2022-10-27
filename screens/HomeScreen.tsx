import React from 'react';

import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { MonoText } from '../components/StyledText';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default function Home(/*{ navigation }: RootTabScreenProps<'Home'>*/) {
    return (
        <View style={styles.container}>
            <MonoText> home screen </MonoText>
        </View>
    );
}
