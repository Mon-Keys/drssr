import {
    GestureResponderEvent,
    Image,
    Pressable,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import { View } from '../base/Themed';
import { Layout } from '../../styles';
import { Clothes } from '../../reducers/items/clothesReducer';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginHorizontal: Layout.margins.small
    },
    previewContainer: {
        width: 100,
        height: 100,
        borderRadius: Layout.cornerRadius
    },
    preview: {
        flex: 1,
        resizeMode: 'center',
        borderRadius: Layout.cornerRadius
    }
});

const ItemPreview = ({
    clothes,
    onPress
}: {
    clothes: Clothes;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.previewContainer}>
                    <Image
                        style={styles.preview}
                        source={{
                            uri: getUri(clothes.mask_path)
                        }}
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default ItemPreview;
