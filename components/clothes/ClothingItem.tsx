import { Clothes } from '../../reducers/clothesReducer';
import { View } from '../base/Themed';
import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    image: { width: 100, height: 100, resizeMode: 'contain' }
});

export const ClothingItem = ({ data }: { data: Clothes }) => (
    <View>
        <Image
            style={styles.image}
            source={{
                uri: `data:image/jpg;base64,${data.mask}`
            }}
        />
        <Text>
            {data.brand}

            {data.type}
        </Text>
    </View>
);
