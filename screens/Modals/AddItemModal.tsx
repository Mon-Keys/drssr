import React, { useEffect } from 'react';

import {
    StyleSheet,
    Image,
    ActivityIndicator,
    Platform,
    StatusBar
} from 'react-native';

import { Text, View } from '../../components/base/Themed';

// import { RootStackScreenProps } from '../types';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    analyzeItem,
    selectItemEditor
} from '../../reducers/itemEditorReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { IItemData } from '../../network';
import Colors from '../../styles/Colors';

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

export default function AddItemModal(/*{
    navigation
}: RootStackScreenProps<'AddItem'>*/) {
    const selectItem = useAppSelector(selectItemEditor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello');
        if (selectItem.currentItem != null) {
            let photo: IItemData = {
                file: selectItem.currentItem,
                sex: 'male',
                brand: 'prada'
            };
            dispatch(analyzeItem(photo));
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

    return (
        <View style={styles.container}>
            {selectItem.currentItem ? (
                <Image
                    style={styles.backgroundImage}
                    blurRadius={1}
                    // @ts-ignore
                    source={{ uri: selectItem.currentItem.uri }}
                />
            ) : null}
            {/* <StyledButton title={'analyze'} onPress={analyze} /> */}
            {selectItem.itemResp ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: `data:image/jpg;base64,${selectItem.itemResp.mask}`
                    }}
                />
            ) : null}
            {selectItem.itemResp ? (
                <Text style={styles.type}>
                    {' '}
                    Classified as {selectItem.itemResp.type}{' '}
                </Text>
            ) : null}
            {selectItem.status === 'pending' ? (
                <ActivityIndicator size="large" style={styles.indicator} />
            ) : null}
        </View>
    );
}
