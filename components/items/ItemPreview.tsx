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
import { Clothes } from '../../reducers/clothesReducer';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginHorizontal: Layout.margins.small
    },
    previewContainer: {
        width: 150,
        height: 150,
        borderRadius: Layout.cornerRadius
    },
    preview: {
        flex: 1,
        resizeMode: 'center',
        borderRadius: Layout.cornerRadius
    },
    caption: {
        maxWidth: 150,
        marginTop: Layout.margins.micro,
        paddingLeft: Layout.margins.default,
        fontSize: 12,
        fontWeight: 'bold'
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
                <Text style={styles.caption} numberOfLines={1}>
                    {clothes.brand}
                </Text>
            </View>
        </Pressable>
    );
};

export default ItemPreview;
