import { Platform, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../../components/base/Themed';
import SearchBar from '../../components/base/SearchBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    }
});

export default function DiscoverScreen(/*{
    navigation
}: RootTabScreenProps<'Search'>*/) {
    return (
        <View style={styles.container}>
            <SearchBar />
            <Text> Discover this </Text>
        </View>
    );
}
