import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { View } from '../../../components/base/Themed';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
    Clothes,
    getCategories,
    selectUserItems
} from '../../../reducers/clothesReducer';
import { ClothingItem } from '../../../components/clothes/ClothingItem';
import Colors from '../../../styles/Colors';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        color: Colors.base.black
    }
});

export default function ItemsWardrobeScreen() {
    // const [showSelect, setShowSelect] = React.useState<String>('');

    const categories = useAppSelector(getCategories);

    const clothes = useAppSelector(selectUserItems);

    const itemsByCategory = (name: string) =>
        clothes.filter((item) => item.type === name);

    // const dispatch = useAppDispatch();

    // const updateItems = () => {
    //     dispatch(fetchUsersClothes());
    // };

    return (
        <View>
            <Text style={styles.text}> {categories.join()}</Text>
            <FlatList
                data={itemsByCategory('Tee')}
                renderItem={({ item }) => <ClothingItem data={item} />}
                keyExtractor={(item: Clothes) => item.id.toString()}
            />
        </View>
    );
}
