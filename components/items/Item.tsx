import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import { Colors, Layout } from '../../styles';
import { Clothes } from '../../reducers/items/clothesReducer';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: 300,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        margin: Layout.margins.default
    },
    image: {
        flex: 1,
        resizeMode: 'center',
    },
    descriptionContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        margin: Layout.margins.default,
        marginTop: 0,
        padding: Layout.margins.default,
    },
});

export default function Item({ item }: { item: Clothes }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: getUri(item.mask_path)
                    }}
                />
            </View>
            <View style={styles.descriptionContainer}>
                <Text>{item.description || 'Облегающее платье длиной до середины икры из трикотажа. Модель без рукавов с тонкими регулируемыми бретелями, вырезом в форме сердца и формованными чашечками. Плоские швы, завернутые спереди и сзади. Отрез на талии и прямой низ.'}</Text>
            </View>
        </View>
    );
}
