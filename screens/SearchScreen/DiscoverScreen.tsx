import { Platform, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../../components/base/Themed';
import Colors from '../../constants/Colors';
import SearchBar from '../../components/base/SearchBar'

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            <SearchBar />
            <Text> Discover this </Text>
        </View>
    );
}
