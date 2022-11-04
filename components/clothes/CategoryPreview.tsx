import { View } from '../base/Themed';
import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    image: { width: 150, height: 150, resizeMode: 'contain' }
});

export interface CategoryPreviewProps {
    img?: string;
    name: string;
}

export const CategoryItem = (props: CategoryPreviewProps) => (
    <View>
        <Image
            style={styles.image}
            source={{
                uri: `data:image/jpg;base64,${props.img}`
            }}
        />
        <Text>{props.name}</Text>
    </View>
);
