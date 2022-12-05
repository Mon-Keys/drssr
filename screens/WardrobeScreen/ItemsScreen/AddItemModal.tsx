import React, { useEffect } from 'react';

import {ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { IItemData } from '../../../network';
import Colors from '../../../styles/Colors';
import {
    clearAddItem,
    selectPrepareClothes
} from '../../../reducers/items/clothesReducer';
import { addClothes, prepareClothes } from '../../../reducers/items/addItem';
import BigImage from '../../../components/item/BigImage';
import { Layout } from '../../../styles';
import InputContainer, {
    checkValidation,
    getValue,
    InputFieldData,
    updateValue
} from '../../../components/item/InputContainer';
import BaseButton from '../../../components/base/BaseButton';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from '../../../types';
import { linkItemRegExp, typeItemRegExp } from '../../../constants/validation';
import {selectUser} from "../../../reducers/userReducer";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    imageContainer: {
        margin: Layout.margins.default
    },
    bodyContainer: {
        marginHorizontal: Layout.margins.default
    },
    submitContainer: {
        margin: Layout.margins.default
    },
    indicator: {
        marginVertical: Layout.margins.default
    }
});

export default function AddItemModal() {
    const navigation = useNavigation<RootNavigation>();

    const user = useAppSelector(selectUser);
    const prepareItem = useAppSelector(selectPrepareClothes);
    const dispatch = useAppDispatch();

    const fieldType: InputFieldData = {
        key: 'type',
        title: 'Тип вещи',
        placeholder: 'Например джинсы',
        validationFunc: (text) => {
            if (text === '') {
                return 'Заполните поле';
            }
            if (!typeItemRegExp.test(text)) {
                return 'Используйте только буквы';
            }
            return '';
        }
    };
    const fieldLink: InputFieldData = {
        key: 'link',
        title: 'Ссылка',
        placeholder: 'Ссылка на вещь в магазине',
        validationFunc: (text) => {
            if (text === '') {
                return '';
            }
            if (!linkItemRegExp.test(text)) {
                return 'Неверный формат ссылки';
            }
            return '';
        }
    };
    const fieldBrand: InputFieldData = {
        key: 'brand',
        title: 'Бренд',
        placeholder: 'Укажите бренд',
        validationFunc: (text) => {
            if (text === '') {
                return '';
            }
            if (text.length > 30) {
                return 'Слишко длинное название бренда';
            }
            return '';
        }
    };
    const fields: Array<InputFieldData> = user.userData.stylist
        ? [fieldType, fieldLink, fieldBrand]
        : [fieldType, fieldBrand];

    useEffect(() => {
        if (prepareItem.currentItem != null) {
            let photo: IItemData = {
                file: prepareItem.currentItem
            };
            dispatch(prepareClothes(photo));
        }
    }, [dispatch, prepareItem.currentItem]);

    navigation.addListener('beforeRemove', () => {
        dispatch(clearAddItem());
    });

    const add = () => {
        const item = prepareItem.itemResp;
        if (item == null || !checkValidation(fields)) {
            return;
        }
        dispatch(
            addClothes({
                id: item.id,
                type: getValue(fields, 'type'),
                link: getValue(fields, 'link'),
                brand: getValue(fields, 'brand'),
                price: Number(getValue(fields, 'price')),
                color: getValue(fields, 'color'),
                sex: 'unisex', // TODO required.
                currency: 'RUB' // TODO required
                // description: 'Google Фото – это удобный сервис для хранения фото и видео. Они упорядочиваются автоматически, и вы можете делиться ими с кем захотите.',
            })
        );
        navigation.navigate('ItemInWardrobe', { id: item.id });
    };

    let img = '';

    if (prepareItem.itemResp) {
        updateValue(fields, 'type', prepareItem.itemResp.type);
        img = prepareItem.itemResp.mask_path;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            enabled={Platform.OS === "ios"}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <BigImage
                    img={img}
                    style={styles.imageContainer}
                    loading={prepareItem.status === 'pending'}
                />

                {prepareItem.status === 'pending' ? (
                    <>
                        <ActivityIndicator
                            size="large"
                            color={Colors.base.black}
                            style={styles.indicator}
                        />
                    </>
                ) : (
                    <>
                        <InputContainer
                            inputFields={fields}
                            style={styles.bodyContainer}
                        />
                        <BaseButton
                            title={'Сохранить'}
                            onPress={add}
                            style={styles.submitContainer}
                        />
                    </>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
