import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { Layout } from '../../../styles';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserItems } from '../../../reducers/items/clothesReducer';
import ItemPreview from '../../../components/items/ItemPreview';

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        alignItems: 'center'
    },
    columnWrapper: {
        minWidth: 328, // TODO хак, чтобы flex-start и center хорошо отрабатывали как для нескольких, так и для одного
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

export default function ItemsScreen() {
    const clothing = useAppSelector(selectUserItems);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                data={clothing}
                renderItem={({ item }) => <ItemPreview clothes={item} />}
            />
        </SafeAreaView>
    );
}
