import React, {useEffect} from 'react';

import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';

import {useAppSelector} from '../../../hooks/useAppSelector';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {IItemData} from '../../../network';
import Colors from '../../../styles/Colors';
import {clearAddItem, selectPrepareClothes} from "../../../reducers/items/clothesReducer";
import {addClothes, prepareClothes} from "../../../reducers/items/addItem";
import BigImage from "../../../components/item/BigImage";
import {Layout} from "../../../styles";
import InputContainer, {getValue, InputFieldData, updateValue} from "../../../components/item/InputContainer";
import BaseButton from "../../../components/base/BaseButton";
import {useNavigation} from "@react-navigation/native";
import {RootNavigation} from "../../../types";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    imageContainer: {
        margin: Layout.margins.default
    },
    bodyContainer: {
        marginHorizontal: Layout.margins.default,
    },
    submitContainer: {
        margin: Layout.margins.default,
    },
    indicator: {
        marginVertical: Layout.margins.default,
    }
});

export default function AddItemModal() {
    const navigation = useNavigation<RootNavigation>();

    const prepareItem = useAppSelector(selectPrepareClothes);
    const dispatch = useAppDispatch();

    const fields: Array<InputFieldData> = [
        {key: 'type', title: 'Тип вещи', placeholder: 'Например джинсы'},
        {key: 'name', title: 'Название', placeholder: 'Дайте название вещи'},
        // {key: 'link', title: 'Ссылка', placeholder: 'Ссылка на вещь в магазине'},
        {key: 'brand', title: 'Бренд', placeholder: 'Укажите бренд'},
        // {key: 'price', title: 'Цена', placeholder: 'Укажите цену вещи'},
        // {key: 'color', title: 'Цвет', placeholder: 'Укажите цвет вещи'},
    ]

    useEffect(() => {
        if (prepareItem.currentItem != null) {
            let photo: IItemData = {
                file: prepareItem.currentItem,
            };
            dispatch(prepareClothes(photo));
        }
    }, [dispatch, prepareItem.currentItem]);

    const add = () => {
        const item = prepareItem.itemResp;
        if (item == null) {
            return
        }
        dispatch(addClothes({
            id: item.id,
            link: getValue(fields, 'link'),
            brand: getValue(fields, 'brand'),
            price: Number(getValue(fields, 'price')),
            color: getValue(fields, 'color'),
            sex: 'unisex', // TODO required.
            currency: 'RUB', // TODO required
            // description: 'Google Фото – это удобный сервис для хранения фото и видео. Они упорядочиваются автоматически, и вы можете делиться ими с кем захотите.',
        }))
        navigation.navigate('Item', { index: 0 });
        dispatch(clearAddItem());
    }

    let img = '';

    if (prepareItem.itemResp) {
        updateValue(fields, 'type', prepareItem.itemResp.type); // TODO чет не работает
        img = prepareItem.itemResp.mask_path;
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <BigImage img={img} style={styles.imageContainer}/>

            <InputContainer inputFields={fields} style={styles.bodyContainer}/>

            {prepareItem.status === 'pending' ? (
                <ActivityIndicator size="large" color={Colors.base.black} style={styles.indicator} />
            ) : (
                <BaseButton title={'Сохранить'} onPress={add} style={styles.submitContainer} />
            )}
        </ScrollView>
    );
}
