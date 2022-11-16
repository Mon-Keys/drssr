import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, View} from 'react-native';

import {Layout} from "../../../styles";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Clothes, selectUserItems} from "../../../reducers/clothesReducer";
import ClothingPreview from "../../../components/clothes/ClothingPreview";
import {ClothingByCategoryScreenRouteProp, ThingScreenRouteProp} from "../../../types";
import {useRoute} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        alignItems: 'center'
    },
});

export default function ThingScreen() {
    const clothing = useAppSelector(selectUserItems);

    const route = useRoute<ThingScreenRouteProp>();
    const { index } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ClothingPreview clothes={clothing[index]} />
        </SafeAreaView>
    );
}
