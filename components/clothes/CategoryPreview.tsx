import { View } from '../base/Themed';
import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import { ClothingCategory } from "../../reducers/clothesReduser";

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: 14,
        overflow: 'hidden',
    },
    caption: {
        marginLeft: 14,
        marginTop: 14,
        fontSize: 12,
        fontWeight: 'bold',
    },
    preview: {
        marginLeft: 40,
        flex: 1,
        resizeMode: 'center',

        marginHorizontal: -14,
        marginBottom: -14,
    },
});

const ClothingCategoryPreview = ({ category }: { category: ClothingCategory }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.caption}>
                {category.caption}
            </Text>
            <Image
                style={styles.preview}
                source={{
                    uri: `data:image/jpg;base64,${category.img}`
                }}
            />
        </View>
    );
}

export default ClothingCategoryPreview;
