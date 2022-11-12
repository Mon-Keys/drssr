import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { View } from '../components/base/Themed';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCategories } from '../reducers/clothesReduser';
import CategoryPreview from '../components/clothes/CategoryPreview';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.base.lightgray
    },
    columnWrapper: {
        margin: 7,
        justifyContent: 'space-around'
    }
});

export default function ClothingCategoriesScreen() {
    const categories = useAppSelector(getCategories);

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
                horizontal={false}
                data={categories}
                renderItem={({ item }) => <CategoryPreview category={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
