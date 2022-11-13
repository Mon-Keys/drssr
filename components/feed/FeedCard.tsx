import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    image: { width: 170, height: 240, resizeMode: 'cover', borderRadius: 14 },
    cardContainer: {
        borderRadius: 14,
        margin: 7
    }
});

export interface FeedCardProps {
    previewSrc: string;
    id: number;
    onPress?: () => void;
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
        </Pressable>
    </View>
);
