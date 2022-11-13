import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { FeedCommon } from '../../components/feed/FeedCommon';
import { RootTabScreenProps } from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    }
});

export default function DiscoverScreen({
    navigation
}: RootTabScreenProps<'Search'>) {
    return (
        <SafeAreaView style={styles.container}>
            <FeedCommon navigation={navigation} />
        </SafeAreaView>
    );
}
