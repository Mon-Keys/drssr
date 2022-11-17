import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../../components/base/Themed';
import { RootTabScreenProps } from '../../../types';
import { FeedCommon } from '../../../components/feed/FeedCommon';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});

export default function SubscriptionsFeedScreen({
    navigation
}: RootTabScreenProps<'Home'>) {
    return (
        <View style={styles.container}>
            <FeedCommon navigation={navigation} />
        </View>
    );
}
