import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../styles';
import { AntDesign } from '@expo/vector-icons';

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
    callback: () => void;
}

export const LikeFeedCardButton = (props: LikeFeedCardButtonProps) => {
    return (
        <Pressable>
            <View style={styles.likeButton}>
                <AntDesign
                    style={styles.heartIcon}
                    name="hearto"
                    size={10}
                    color={Colors.base.black}
                />
            </View>
        </Pressable>
    );
};
