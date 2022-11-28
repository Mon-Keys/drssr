import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Clothes, selectUserItems } from '../../reducers/items/clothesReducer';
import { ThingScreenRouteProp } from '../../types';
import { useRoute } from '@react-navigation/native';
import Item from '../../components/items/Item';
import { fetchClothesById, selectFeedClothes } from "../../reducers/feedReducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../styles";

export default function ItemModal() {
    const dispatch = useAppDispatch();

    const myClothes = useAppSelector(selectUserItems);
    const feedClothes = useAppSelector(selectFeedClothes);

    const route = useRoute<ThingScreenRouteProp>();
    const { id } = route.params;

    // 1. ищем шмотку в своем гардеробе
    // 2. ищем шмотку в ленте (ранее просмотренную)
    // 3. запрашиваем шмотку по айдишнику
    const smartGetItem = (): Clothes | null => {
        let foundItem = myClothes.find((item) => item.id == id);
        if (foundItem) {
            return foundItem;
        }

        foundItem = feedClothes.find((item) => item.id == id);
        if (foundItem) {
            return foundItem;
        }

        dispatch(fetchClothesById(id));

        return null;
    }

    const item = smartGetItem();
    if (!item) {
        return (
            <ActivityIndicator color={Colors.base.black} size={42} style={{ flex: 1, justifyContent: 'center' }} />
        );
    }

    return (
        <Item item={item} />
    );
}
