import { View } from '../base/Themed';
import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors, Layout } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { dislikePost, likePost } from '../../reducers/feedReducer';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: Layout.margins.small
    },
    likeButton: {
        borderRadius: 50,
        backgroundColor: Colors.base.lightgray,
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export interface LikeFeedCardButtonProps {
    id: number;
    currentLikes: number;
    is_liked?: boolean;
}

export const LikeFeedCardButton = (props: LikeFeedCardButtonProps) => {
    const dispatch = useAppDispatch();

    const like = () => {
        if (!props.is_liked) {
            dispatch(
                likePost({ id: props.id, likesAmount: props.currentLikes })
            );
        } else {
            dispatch(dislikePost({ id: props.id }));
        }
    };

    return (
        <Pressable onPress={like} style={styles.container}>
            <View style={styles.likeButton}>
                {props.is_liked ? (
                    <AntDesign
                        name="heart"
                        size={12}
                        color={Colors.base.black}
                    />
                ) : (
                    <AntDesign
                        name="hearto"
                        size={12}
                        color={Colors.base.black}
                    />
                )}
            </View>
        </Pressable>
    );
};
