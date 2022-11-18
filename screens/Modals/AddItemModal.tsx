import React, { useEffect } from 'react';

import {
    StyleSheet,
    Image,
    ActivityIndicator,
    Platform,
    StatusBar
} from 'react-native';

import { Text, View } from '../../components/base/Themed';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { IItemData } from '../../network';
import Colors from '../../styles/Colors';
import {getUri} from "../../network/const";
import {fetchUsersClothes} from "../../reducers/items/fetchClothes";
import {selectPrepareClothes} from "../../reducers/items/clothesReducer";
import {addClothes, prepareClothes} from "../../reducers/items/addItem";
import StyledButton from "../../components/base/StyledButton";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
    type: {
        top: 20,
        color: Colors.base.white,
        fontSize: 18,
        fontFamily: 'proxima-nova'
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        height: 400,
        width: 400,
        resizeMode: 'contain',
        opacity: 0.1,
        position: 'absolute'
    },
    image: { width: 400, height: 400, resizeMode: 'contain' },
    indicator: { position: 'absolute' }
});

export default function AddItemModal() {
    const selectItem = useAppSelector(selectPrepareClothes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectItem.currentItem != null) {
            let photo: IItemData = {
                file: selectItem.currentItem,
            };
            dispatch(prepareClothes(photo));
        }
    }, [dispatch, selectItem.currentItem]);

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
        const item = selectItem.itemResp;
        if (item == null) {
            return
        }
        dispatch(addClothes({
            id: item.id,
            // sex: 'male',
            brand: 'h&m',
            // color: 'red',
            // currency: 'RUB',
            // link: 'https://unsplash.com/s/photos/photo',
            // price: 1599,
            // description: 'Google Фото – это удобный сервис для хранения фото и видео. Они упорядочиваются автоматически, и вы можете делиться ими с кем захотите.',
        }))
    }

    return (
        <View style={styles.container}>
            {/* <StyledButton title={'analyze'} onPress={analyze} /> */}
            {selectItem.itemResp ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: getUri(selectItem.itemResp.mask_path)
                    }}
                />
            ) : null}
            {selectItem.itemResp ? (
                <Text style={styles.type}>
                    {' '}
                    {/*Classified as {selectItem.itemResp.type}{' '}*/}
                </Text>
            ) : null}
            {selectItem.status === 'pending' ? (
                <ActivityIndicator size="large" style={styles.indicator} />
            ) : null}
            <StyledButton title={'Добавить'} onPress={add} />
        </View>
    );
}
