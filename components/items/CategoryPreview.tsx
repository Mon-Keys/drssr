import { View } from '../base/Themed';
import {GestureResponderEvent, Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import { ClothingCategory } from '../../reducers/clothesReducer';
import { Layout } from '../../styles';
import { getUri } from "../../network/const";

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: Layout.cornerRadius,
        overflow: 'hidden',
        marginHorizontal: Layout.margins.small
    },
    caption: {
        marginLeft: Layout.margins.default,
        marginTop: Layout.margins.default,
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 10
    },
    preview: {
        flex: 1,
        resizeMode: 'center',

        marginLeft: 40,
        marginHorizontal: -Layout.margins.default,
        marginTop: -Layout.margins.small,
        marginBottom: -Layout.margins.default
    }
});

const ClothingCategoryPreview = ({
    category,
    onPress,
}: {
    category: ClothingCategory;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.caption} numberOfLines={1}>
                    {category.caption}
                </Text>
                <Image
                    style={styles.preview}
                    source={{
                        uri: getUri(category.img)
                    }}
                />
            </View>
        </Pressable>
    );
};

export default ClothingCategoryPreview;
