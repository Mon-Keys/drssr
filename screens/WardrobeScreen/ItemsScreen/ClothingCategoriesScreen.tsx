import React from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../../../components/base/Themed';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {fetchUsersClothes, getCategories} from '../../../reducers/clothesReducer';
import CategoryPreview from '../../../components/clothes/CategoryPreview';
import { Colors } from '../../../styles';
import {useAppDispatch} from "../../../hooks/useAppDispatch";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.base.lightgray,
        flex: 1,
        alignItems: 'center',
    },
    columnWrapper: {
        margin: 7,
        justifyContent: 'flex-start'
    }
});

export default function ClothingCategoriesScreen() {
    const categories = useAppSelector(getCategories);
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
