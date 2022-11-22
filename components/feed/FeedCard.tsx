import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { LikeFeedCardButton } from './LikeFeedCardButton';

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
    previewSrc: string;
    id: number;
    onPress?: () => void;
    hasLikeButton: boolean;
}

export const FeedCard = (props: FeedCardProps) => (
    <View style={styles.cardContainer}>
        <Pressable onPress={props.onPress}>
            <Image
                style={styles.image}
                source={{
                    uri: `data:image/jpg;base64,${props.previewSrc}`
                }}
            />
            <LikeFeedCardButton />
        </Pressable>
    </View>
);
