import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Colors } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { LikeFeedCardButton } from './LikeFeedCardButton';
import { IPost } from '../../reducers/posts/post';
import {getUri} from "../../network/const";

const styles = StyleSheet.create({
    image: { width: 170, height: 240, resizeMode: 'cover', borderRadius: 14 },
    cardContainer: {
        borderRadius: 14,
        margin: 7,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});

export interface FeedCardProps {
    id: number;
    onPress?: () => void;
    hasLikeButton: boolean;
    post: IPost;
}

export const FeedCard = (props: FeedCardProps) => (
    <View style={styles.cardContainer}>
        <Pressable onPress={props.onPress}>
            <Image
                style={styles.image}
                source={(() => {
                    if (props.post.previews_paths) {
                        return {
                            uri: getUri(props.post.previews_paths.length != 0
                                    ? props.post.previews_paths[0]
                                    : props.post.look.img_path
                            )
                        };
                    } else {
                        return {
                            uri: `http://leonidperl.in/${props.post.look?.img_path}`
                        };
                    }
                })()}
            />
            <LikeFeedCardButton
                id={props.post.id}
                currentLikes={props.post.likes}
            />
        </Pressable>
    </View>
);
