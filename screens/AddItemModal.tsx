import React, { useEffect } from 'react'
import { StyleSheet, Image, ActivityIndicator, GestureResponderEvent, ImageBackground } from 'react-native';

import { Text, View } from '../components/Themed';

import { RootTabScreenProps } from "../types";
import { useAppSelector } from "../hooks/useAppSelector";
import { analyzeItem, selectItemEditor } from "../reducers/itemEditorReducer";
import { useAppDispatch } from "../hooks/useAppDispatch";
import StyledButton from "../components/StyledButton";
import { IItemData } from '../network';
import Colors from '../constants/Colors';

export default function AddItemModal({ navigation }: RootTabScreenProps<'Wardrobe'>) {
    const selectItem = useAppSelector(selectItemEditor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello')
        if (selectItem.currentItem != null) {
            let photo: IItemData = {
                file: selectItem.currentItem,
                sex: 'male',
                brand: 'prada',
            }
            dispatch(analyzeItem(photo))
        }
    }, [dispatch])

    const analyze = (event: GestureResponderEvent) => {
        console.log("event")
        if (selectItem.currentItem != null) {
            let photo: IItemData = {
                file: selectItem.currentItem,
                sex: 'male',
                brand: 'prada',
            }
            dispatch(analyzeItem(photo))
        }
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            {selectItem.currentItem ? <Image style={{ height: 400, width: 400, resizeMode: "contain", opacity: 0.1, position: "absolute" }} blurRadius={1} source={{ uri: selectItem.currentItem.uri }} /> : null}
            {/* <StyledButton title={'analyze'} onPress={analyze} /> */}
            {selectItem.itemResp ? <Image style={{ width: 400, height: 400, resizeMode: "contain" }} source={{ uri: `data:image/jpg;base64,${selectItem.itemResp.mask}` }} /> : null}
            {selectItem.itemResp ? <Text style={styles.type}> Classified as {selectItem.itemResp.type} </Text> : null}
            {selectItem.status === "pending" ? <ActivityIndicator size="large" style={{ position: "absolute" }} /> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    type: {
        top: 20,
        color: Colors.base.white,
        fontSize: 18,
        fontFamily: 'proxima-nova'
    },
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
});
