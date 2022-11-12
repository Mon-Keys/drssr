import React from 'react';
import { StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { View } from '../../components/base/Themed';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default function PostModalScreen(/*{
    navigation
}: RootStackScreenProps<'Post'>*/) {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>aga</Text>
        </View>
    );
}
