import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { View } from '../../../components/base/Themed';
import { FeedCommon } from '../../../components/feed/FeedCommon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
    fetchSubscribtionPosts,
    selectFeeds
} from '../../../reducers/feedReducer';
import { AppDispatch } from '../../../store';
import { RootTabScreenProps } from '../../../types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});

export default function SavedHomeScreen({
    navigation
}: RootTabScreenProps<'Home'>) {
    const dispatch = useDispatch<AppDispatch>();
    const subscribtionFeedData = useAppSelector(selectFeeds);
    const [, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('1');
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
