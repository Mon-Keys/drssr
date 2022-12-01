import { View } from '../base/Themed';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import React from 'react';
import { FeedCard, FeedCardProps } from './FeedCard';
import { Feed } from '../../reducers/feedReducer';
import { IPost } from '../../reducers/posts/post';

const styles = StyleSheet.create({
    image: { width: 170, height: 240, resizeMode: 'cover', borderRadius: 14 },
    cardContainer: {
        borderRadius: 14,
        margin: 7
    },
    container: {
        backgroundColor: 'transparent'
    }
});

export interface FeedCommonProps extends FlatListProps<IPost> {
    navigation: any;
    feed?: Feed;
}

export const FeedCommon = (props: FeedCommonProps) => (
    <View style={styles.container}>
        <FlatList
            {...props}
            data={props.feed?.data}
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
            style={styles.container}
            renderItem={(item) => (
                <FeedCard
                    hasLikeButton={true}
                    post={item.item}
                    onPress={() => props.navigation.navigate('Post', item.item)}
                    id={item.item.id}
                />
            )}
        />
    </View>
);
