import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, View, Image, Platform, StatusBar, Text} from 'react-native';

import {Colors, Layout} from "../../../styles";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Clothes, selectUserItems} from "../../../reducers/clothesReducer";
import ClothingPreview from "../../../components/clothes/ClothingPreview";
import {
    ClothingByCategoryScreenRouteProp,
    ClothingCategoriesScreenNavigation,
    ThingScreenRouteProp
} from "../../../types";
import {useNavigation, useRoute} from "@react-navigation/native";
import IconButton from "../../../components/base/IconButton";
import {AntDesign} from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        display: 'flex',
        backgroundColor: 'transparent'
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
        marginRight: 26,
        color: Colors.base.black
    },
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

export default function ThingScreen() {
    const clothing = useAppSelector(selectUserItems);
    const navigation = useNavigation<ClothingCategoriesScreenNavigation>();

    const route = useRoute<ThingScreenRouteProp>();
    const { index } = route.params;

    const thing = clothing[index];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton style={{ flex: 0 }} icon={(
                    <AntDesign
                        name='back'
                        size={24}
                        color={Colors.base.black}
                    />
                )} onPress={() => navigation.goBack()}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText} >{thing.type + ' ' + thing.brand}</Text>
                </View>

            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `data:image/jpg;base64,${thing.mask}`
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
