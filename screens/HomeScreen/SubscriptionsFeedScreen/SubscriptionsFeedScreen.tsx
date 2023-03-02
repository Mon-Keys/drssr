import React from 'react';
import {
    ActivityIndicator,
    Platform,
    RefreshControl,
    StatusBar,
    StyleSheet
} from 'react-native';

import { View } from '../../../components/base/Themed';
import { RootTabScreenProps } from '../../../types';
import { FeedCommon } from '../../../components/feed/FeedCommon';
import {
    fetchSubscribtionPosts,
    selectFeeds,
    selectSubscribtionFeed
} from '../../../reducers/feedReducer';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 7,
        backgroundColor: 'transparent'
    }
});

const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SubscriptionsFeedScreen({
    navigation
}: RootTabScreenProps<'Home'>) {
    const dispatch = useAppDispatch();
    const subscribtionFeed = useAppSelector(selectSubscribtionFeed);

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
                        refreshing={subscribtionFeed.status == 'pending'}
                        onRefresh={onRefresh}
                    />
                }
                navigation={navigation}
                feed={subscribtionFeed}
            />
        </View>
    );
}
