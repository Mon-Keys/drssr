import { View } from '../base/Themed';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import React from 'react';
import { FeedCard } from './FeedCard';
import { Feed } from '../../reducers/feedReducer';
import { IPost } from '../../reducers/posts/post';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    columnWrapper: {
        marginBottom: 7
    }
});

export interface FeedCommonProps extends FlatListProps<IPost> {
    navigation: any;
    feed: Feed;
}

// TODO костыль от lnkn13
// FlatList иди нахуй, еблан его придумал сука
// поэтому ловите нахуй костыль
// если вам непонятен этот код, то удалите его нахуй, а еще FlatList заодно с планеты земля
export const FeedCommon = (props: FeedCommonProps) => {
    let posts: Array<IPost> = [];
    if (props.feed && props.feed.data && props.feed.data.length) {
        posts.push(...props.feed.data);
        if (posts.length % 2) {
            let xyi: IPost = {
                id: -1,
                creator_id: 0,
                type: '',
                look: posts[0].look,
                previews_paths: [],
                likes: 0,
                is_liked: false
            };
            posts.push(xyi);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                {...props}
                showsVerticalScrollIndicator={false}
                data={posts}
                numColumns={2}
                keyExtractor={(item) => `${item.id}`}
                style={styles.container}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({item, index}) => (
                    <>
                        {(item.id == -1) ? (
                            <View style={{ flex: 1, backgroundColor: 'transparent' }}/>
                        ) : (
                            <View style={{ flex: 1, backgroundColor: 'transparent', marginRight: index % 2 ? 0 : 7 }}>
                                <FeedCard
                                    hasLikeButton={true}
                                    post={item}
                                    onPress={() => props.navigation.navigate('Post', { post: item })}
                                    id={item.id}
                                />
                            </View>
                        )}
                    </>
                )}
            />
        </View>
    );
}
