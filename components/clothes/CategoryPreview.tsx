import { View } from '../base/Themed';
import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import { ClothingCategory } from "../../reducers/clothesReduser";

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: 14,
    },
    preview: {
        flex: 1,
        resizeMode: 'center',
    },
    caption: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 4,
    },
});

// https://snack.expo.dev/kN6t1IJgh
export const CategoryPreview = ({ category }: { category: ClothingCategory }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.preview}
                source={{
                    uri: `data:image/jpg;base64,${category.img}`
                }}
            />
            <Text style={styles.caption}>
                {category.caption}
            </Text>
        </View>
    );
}
