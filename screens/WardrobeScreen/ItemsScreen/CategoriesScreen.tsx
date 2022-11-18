import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../../../components/base/Themed';
import { useAppSelector } from '../../../hooks/useAppSelector';
import CategoryPreview from '../../../components/items/CategoryPreview';
import { Colors, Layout } from '../../../styles';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { RootNavigation } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import EmptyView from "../../../components/base/EmptyView";
import {getCategories} from "../../../reducers/items/categories";
import {fetchUsersClothes} from "../../../reducers/items/fetchClothes";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.base.lightgray
    },
    columnWrapper: {
        minWidth: 342, // TODO не бейте за костыль, не ебу как по другому
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

export default function CategoriesScreen() {
    const navigation = useNavigation<RootNavigation>();

    const categories = useAppSelector(getCategories);

    const [refreshing] = React.useState(false);
    const dispatch = useAppDispatch();
    const refresh = () => {
        dispatch(fetchUsersClothes());
    };

    const isCategories = (): boolean => {
        return categories && categories.length > 0;
    };

    return (
        <View style={styles.container}>
            {isCategories() ? (
                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                    data={categories}
                    renderItem={({ item }) => (
                        <CategoryPreview
                            category={item}
                            onPress={() =>
                                navigation.navigate('ItemsByCategory', {
                                    category: item.caption
                                })
                            }
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.base.black}
                            refreshing={refreshing}
                            onRefresh={refresh}
                        />
                    }
                />
            ) : (
                <EmptyView textHeader={'Здесь пока пусто'} text={'Добавьте вещи с помощью +'} />
            )}
        </View>
    );
}
