import { View } from '../../base/Themed';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import { Colors } from '../../../styles';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {dislikePost, likePost} from '../../../reducers/feedReducer';

const styles = StyleSheet.create({
    likeButton: {
    }
});

export interface LikeFeedCardButtonProps {
    id: number;
    currentLikes: number;
    is_liked?: boolean;
    style?: ViewStyle;
    callback?: () => void;
}

export const LikeButton = (props: LikeFeedCardButtonProps) => {
    const dispatch = useAppDispatch();

    const like = () => {
        if (!props.is_liked) {
            dispatch(
                likePost({ id: props.id, likesAmount: props.currentLikes })
            );
        } else {
            dispatch(
                dislikePost({ id: props.id })
            );
        }
        if (props.callback) {
            props.callback();
        }
    }

    return (
        <Pressable
            onPress={like}
            style={props.style}
        >
            <View style={styles.likeButton}>
                {props.is_liked ? (
                    <AntDesign
                        name="heart"
                        size={24}
                        color={Colors.base.black}
                    />
                ) : (
                    <AntDesign
                        name="hearto"
                        size={24}
                        color={Colors.base.black}
                    />
                )}
            </View>
        </Pressable>
    );
};
