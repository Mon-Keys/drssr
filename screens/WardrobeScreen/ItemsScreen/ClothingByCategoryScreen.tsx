import React from 'react';
import {StyleSheet, Text, SafeAreaView, View, FlatList, Platform, StatusBar} from 'react-native';

import {Colors, Layout} from "../../../styles";
import IconButton from "../../../components/base/IconButton";
import {AntDesign} from "@expo/vector-icons";
import {useAppSelector} from "../../../hooks/useAppSelector";
import { selectUserItems } from "../../../reducers/clothesReducer";
import ClothingPreview from "../../../components/clothes/ClothingPreview";
import {
    ClothingByCategoryScreenRouteProp,
    ClothingCategoriesScreenNavigation,
} from "../../../types";
import {useNavigation, useRoute} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: Layout.margins.default,
        marginBottom: Layout.margins.small,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    },
    bodyContainer: {
        width: Layout.window.width,
        alignItems: 'center'
    },
    columnWrapper: {
        minWidth: 328, // TODO sorry, this is gavno code
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

export default function ClothingByCategoryScreen() {
    const navigation = useNavigation<ClothingCategoriesScreenNavigation>();

    const route = useRoute<ClothingByCategoryScreenRouteProp>();
    const { category } = route.params;
    const clothing = useAppSelector(selectUserItems).filter((item) => item.type === category)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton style={{ flex: 0 }} icon={(
                        <AntDesign
                            name='back'
                            size={36}
                            color={Colors.base.darkgray}
                        />
                    )} onPress={() => navigation.goBack()}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText} >{category}</Text>
                </View>
                <IconButton style={{ flex: 0 }} icon={(
                    <AntDesign
                        name='search1'
                        size={36}
                        color={Colors.base.darkgray}
                    />
                )} />
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    data={clothing}
                    renderItem={({ item }) => <ClothingPreview clothes={item} />}
                />
            </View>
        </SafeAreaView>
    );
}
