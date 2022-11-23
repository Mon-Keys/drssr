import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { likePost } from '../../reducers/feedReducer';

const styles = StyleSheet.create({
    likeButton: {
        borderRadius: 50,
        backgroundColor: Colors.base.lightgray,
        width: 21,
        height: 21,
        position: 'absolute',
        right: 7,
        bottom: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export interface LikeFeedCardButtonProps {
    id: number;
    currentLikes: number;
}

export const LikeFeedCardButton = (props: LikeFeedCardButtonProps) => {
    const dispatch = useAppDispatch();
    const [liked, setLiked] = React.useState(false);

    return (
        <Pressable
            onPress={() => {
                setLiked(!liked);
                dispatch(
                    likePost({ id: props.id, likesAmount: props.currentLikes })
                );
            }}
        >
            <View style={styles.likeButton}>
                {liked ? (
                    <AntDesign
                        name="heart"
                        size={10}
                        color={Colors.base.black}
                    />
                ) : (
                    <AntDesign
                        name="hearto"
                        size={10}
                        color={Colors.base.black}
                    />
                )}
            </View>
        </Pressable>
    );
};
