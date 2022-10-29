import { Platform, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default function DiscoverScreen(/*{
    navigation
}: RootTabScreenProps<'Search'>*/) {
    return (
        <View style={styles.container}>
            <Text> Discover this </Text>
        </View>
    );
}
