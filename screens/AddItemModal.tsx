import React, {useEffect} from 'react'
import {StyleSheet, Image, ActivityIndicator, GestureResponderEvent} from 'react-native';

import { Text, View } from '../components/Themed';

import {RootTabScreenProps} from "../types";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectItemEditor} from "../reducers/itemEditorReducer";
import {useAppDispatch} from "../hooks/useAppDispatch";
import StyledButton from "../components/StyledButton";

export default function AddItemModal({ navigation }: RootTabScreenProps<'Wardrobe'>) {
    const selectItem = useAppSelector(selectItemEditor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello')
    }, [dispatch])

    const analyze = (event: GestureResponderEvent) => {
        console.log("event")
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text> hello </Text>
            <Image style={{height: 100,width: 100}}source={{uri: selectItem.currentItem.uri}}></Image>
            <StyledButton title={'analyze'} onPress={analyze}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    },
});
