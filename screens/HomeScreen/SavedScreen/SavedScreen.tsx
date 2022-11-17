import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../../components/base/Themed';
import { FeedCommon } from '../../../components/feed/FeedCommon';
import { RootTabScreenProps } from '../../../types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});

export default function SavedHomeScreen({
    navigation
}: RootTabScreenProps<'Home'>) {
    return (
        <View style={styles.container}>
            <FeedCommon navigation={navigation} />
        </View>
    );
}
