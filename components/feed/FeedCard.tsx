import { Clothes } from '../../reducers/clothesReducer';
import { View } from '../base/Themed';
import {ButtonProps, Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    image: { width: 170, height: 240, resizeMode: 'cover',borderRadius: 14 },
    cardContainer: { borderRadius: 14, backgroundColor: Colors.base.black, margin: 7 }
});

export interface FeedCardProps {
    previewSrc: string;
    onPress?: () => void
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
