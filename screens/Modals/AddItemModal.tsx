import React, { useEffect } from 'react';

import {
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { IItemData } from '../../network';
import Colors from '../../styles/Colors';
import {selectPrepareClothes, selectUserItems} from "../../reducers/items/clothesReducer";
import {addClothes, prepareClothes} from "../../reducers/items/addItem";
import BigImage from "../../components/item/BigImage";
import {Layout} from "../../styles";
import InputContainer, {InputFieldData} from "../../components/item/InputContainer";
import BaseButton from "../../components/base/BaseButton";
import {useNavigation} from "@react-navigation/native";
import {RootNavigation} from "../../types";

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

    // if (!prepareItem.itemResp) {
    //     return
    // }
    const fields: Array<{title: string; value: string;}> = [
        // @ts-ignore
        {title: 'Тип вещи', value: ''},
        {title: 'Название', value: ''},
        {title: 'Ссылка', value: ''},
        {title: 'Бренд', value: ''},
        {title: 'Цена', value: ''},
        {title: 'Цвет', value: ''},
    ]
    const fieldsData: Array<InputFieldData> = [];
    fields.forEach((item) => {
        const [text, onChangeText] = React.useState(item.value);
        const field: InputFieldData = {
            title: item.title,
            value: text,
            onChange: onChangeText
        }
        fieldsData.push(field);
    })

    useEffect(() => {
        if (prepareItem.currentItem != null) {
            let photo: IItemData = {
                file: prepareItem.currentItem,
            };
            dispatch(prepareClothes(photo));
        }
    }, [dispatch, prepareItem.currentItem]);

    // const analyze = (event: GestureResponderEvent) => {
    //     console.log('event');
    //     if (selectItem.currentItem != null) {
    //         let photo: IItemData = {
    //             file: selectItem.currentItem,
    //             sex: 'male',
    //             brand: 'prada'
    //         };
    //         dispatch(analyzeItem(photo));
    //     }
    // };

    const add = () => {
        const item = prepareItem.itemResp;
        if (item == null) {
            return
        }
        dispatch(addClothes({
            id: item.id,
            link: fieldsData[2].value,
            brand: fieldsData[3].value,
            price: Number(fieldsData[4].value),
            color: fieldsData[5].value,
            sex: 'unisex', // TODO required
            currency: 'RUB', // TODO required
            // description: 'Google Фото – это удобный сервис для хранения фото и видео. Они упорядочиваются автоматически, и вы можете делиться ими с кем захотите.',
        }))
        navigation.navigate('Item', { index: 0 })
    }


    const clothing = useAppSelector(selectUserItems);
    console.log(clothing[0].mask_path);

    const item = clothing[0]
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <BigImage img={item.mask_path} style={styles.imageContainer}/>

            <InputContainer inputFields={fieldsData} style={styles.bodyContainer}/>

            {prepareItem.status === 'pending' ? (
                <ActivityIndicator size="large" color={Colors.base.black} style={styles.indicator} />
            ) : (
                <BaseButton title={'Добавить'} onPress={add} style={styles.submitContainer} />
            )}
        </ScrollView>
    );
}
