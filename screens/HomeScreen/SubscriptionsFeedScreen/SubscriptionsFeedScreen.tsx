import React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';

import { View } from '../../../components/base/Themed';
import { RootTabScreenProps } from '../../../types';
import { FeedCommon } from '../../../components/feed/FeedCommon';
import {
    fetchSubscribtionPosts,
    selectFeeds
} from '../../../reducers/feedReducer';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SubscriptionsFeedScreen({
    navigation
}: RootTabScreenProps<'Home'>) {
    const dispatch = useDispatch<AppDispatch>();
    const subscribtionFeedData = useAppSelector(selectFeeds);

    React.useEffect(() => {
        dispatch(fetchSubscribtionPosts());
    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        dispatch(fetchSubscribtionPosts());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <FeedCommon
                refreshControl={
                    <RefreshControl
                        refreshing={
                            subscribtionFeedData.SubscribtionFeed.status ==
                            'pending'
                        }
                        onRefresh={onRefresh}
                    />
                }
                navigation={navigation}
                feed={subscribtionFeedData.SubscribtionFeed}
            />
        </View>
    );
}
