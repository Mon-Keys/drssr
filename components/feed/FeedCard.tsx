import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { LikeFeedCardButton } from './LikeFeedCardButton';
import { IPost } from '../../reducers/posts/post';
import { getUri } from '../../network/const';
import { Layout } from "../../styles";

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        minHeight: Layout.window.height / 2.7,
        borderRadius: Layout.cornerRadius
    },
    image: {
        flex: 1,
        // resizeMode: 'contain', по дефолту будет cover, это плохо потому что он обрезает картинку. contain плохо выглядит на ios, поэтому пока так
        borderRadius: Layout.cornerRadius
    },
});

export interface FeedCardProps {
    id: number;
    onPress?: () => void;
    hasLikeButton: boolean;
    post: IPost;
}

export const FeedCard = (props: FeedCardProps) => {
    return (
        <View style={styles.cardContainer}>
            <Pressable style={{flex: 1}} onPress={props.onPress}>
                <Image
                    style={styles.image}
                    source={(() => {
                        if (props.post.previews_paths) {
                            return {
                                uri: getUri(
                                    props.post.previews_paths.length != 0
                                        ? props.post.previews_paths[0]
                                        : props.post.look.img_path
                                )
                            };
                        } else {
                            return {
                                uri: getUri(props.post.look?.img_path)
                            };
                        }
                    })()}
                />
                <LikeFeedCardButton
                    id={props.post.id}
                    currentLikes={props.post.likes}
                    is_liked={props.post.is_liked}
                />
            </Pressable>
        </View>
    );
}
