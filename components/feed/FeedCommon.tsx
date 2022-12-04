import { View } from '../base/Themed';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import React from 'react';
import { FeedCard, FeedCardProps } from './FeedCard';
import { Feed } from '../../reducers/feedReducer';
import { IPost } from '../../reducers/posts/post';
import {Clothes} from "../../reducers/items/clothesReducer";
import {ILook} from "../../reducers/looks/looks";

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
    let data1: Array<IPost> = [];
    data1.push(...props.feed.data);
    if (data1.length % 2) {
        let xyi: IPost = {
            id: -1,
            creator_id: 0,
            type: '',
            look: data1[0].look,
            previews_paths: [],
            likes: 0,
        };
        data1.push(xyi);
    }

    return (
        <View style={styles.container}>
            <FlatList
                {...props}
                showsVerticalScrollIndicator={false}
                data={data1}
                // data={props.feed.data}
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
                                    onPress={() => props.navigation.navigate('Post', item)}
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
