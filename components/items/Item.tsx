import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import {Colors, Layout} from "../../styles";
import { Clothes } from "../../reducers/clothesReducer";

const styles = StyleSheet.create({
    imageContainer: {
        width: 300,
        height: 300,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        margin: Layout.margins.default,
    },
    image: {
        flex: 1,
        resizeMode: 'center',
    },
});

export default function Item({item}: {item: Clothes}) {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{
                    uri: `http://leonidperl.in:80/${item.mask_path}`
                }}
            />
        </View>
    );
}
