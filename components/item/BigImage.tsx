import React from 'react';
import {StyleSheet, View, Image, ViewStyle, ActivityIndicator} from 'react-native';

import { Colors, Layout } from '../../styles';
import { getUri } from '../../network/const';

export interface BigImage {
    img: string;
    style?: ViewStyle;
    loading?: boolean | false,
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 300,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
    },
    image: {
        flex: 1,
        resizeMode: 'center',
        borderRadius: Layout.cornerRadius
    },
});

export default function BigImage(props: BigImage) {
    return (
        <View style={props.style}>
            <View style={styles.imageContainer}>
                {(!props.loading) ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: getUri(props.img)
                        }}
                    />
                ) : null}
            </View>
        </View>
    );
}
