import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    FlatList,
    Platform,
    StatusBar,
    RefreshControl
} from 'react-native';

import { Colors, Layout } from '../../../styles';
import IconButton from '../../../components/base/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserItems } from '../../../reducers/items/clothesReducer';
import ItemPreview from '../../../components/items/ItemPreview';
import {
    ClothingByCategoryScreenRouteProp,
    RootNavigation
} from '../../../types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchUsersClothes } from '../../../reducers/items/fetchClothes';
import ViewBottomMenu from '../../../components/items/ViewBottomMenu';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Back from "../../../components/icons/back";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: Layout.margins.default,
        marginBottom: Layout.margins.small
    },
    flexZero: {
        flex: 0
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
        flex: 1,
        width: Layout.window.width,
        alignItems: 'center'
    },
    columnWrapper: {
        minWidth: 328, // TODO sorry, this is gavno code
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

export default function ItemsByCategoryScreen() {
    const navigation = useNavigation<RootNavigation>();

    const route = useRoute<ClothingByCategoryScreenRouteProp>();
    const { category } = route.params;
    const clothing = useAppSelector(selectUserItems);
    const clothingByCategory = clothing.filter(
        (item) => item.type === category
    );

    const [refreshing] = React.useState(false);
    const dispatch = useAppDispatch();
    const refresh = () => {
        dispatch(fetchUsersClothes());
    };

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const openModal = () => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    };

    return (
        <ViewBottomMenu modalRef={bottomSheetModalRef}>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <IconButton
                        style={styles.flexZero}
                        icon={
                            <Back
                                color={Colors.base.black}
                                width={24}
                            />
                        }
                        onPress={() => navigation.goBack()}
                    />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitleText}>{category}</Text>
                    </View>
                    <IconButton
                        style={styles.flexZero}
                        icon={
                            <AntDesign
                                name="plus"
                                onPress={openModal}
                                size={24}
                                color={Colors.base.black}
                            />
                        }
                    />
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        data={clothingByCategory}
                        renderItem={({ item }) => (
                            <ItemPreview
                                clothes={item}
                                onPress={() =>
                                    navigation.navigate('ItemInWardrobe', {
                                        id: item.id
                                    })
                                }
                            />
                        )}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.base.black}
                                refreshing={refreshing}
                                onRefresh={refresh}
                            />
                        }
                    />
                </View>
            </SafeAreaView>
        </ViewBottomMenu>
    );
}
