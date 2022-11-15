import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../../../components/base/Themed';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {Clothes, ClothingCategory, fetchUsersClothes, getCategories} from '../../../reducers/clothesReducer';
import CategoryPreview from '../../../components/clothes/CategoryPreview';
import { Colors, Layout } from '../../../styles';
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {ClothingCategoriesScreenNavigation, RootTabScreenProps} from "../../../types";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.base.lightgray,
    },
    columnWrapper: {
        minWidth: 342, // TODO не бейте за костыль, не ебу как по другому
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

export default function ClothingCategoriesScreen() {
    const navigation = useNavigation<ClothingCategoriesScreenNavigation>();

    const categories = useAppSelector(getCategories);
    // const categories = Array<ClothingCategory>();
    // categories.push(categories1[0])
    const [refreshing] = React.useState(false);

    const dispatch = useAppDispatch();

    const refresh = () => {
        dispatch(fetchUsersClothes());
    };

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={<RefreshControl
                    tintColor={Colors.base.black}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                data={categories}
                renderItem={({ item }) => <CategoryPreview
                    category={item}
                    onPress={() => navigation.navigate('ClothingByCategory', { category: item.caption })}
                />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
