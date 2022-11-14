import React from 'react';
import { Platform, StatusBar, StyleSheet, Image } from 'react-native';
import { Text, View } from '../../components/base/Themed';

import ImageMasker from '../../components/legacy/ImageMasker';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCreateLook } from '../../reducers/createLookReducer';
// @ts-ignore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
});

export default function SaveLookModal() {
    const lookSelector = useAppSelector(selectCreateLook);

    return (
        <View style={styles.container}>
            <Image style={{ width: 400, height: 400, resizeMode: 'contain' }} source={{ uri: `data:image/jpg;base64,${lookSelector.look.img}` }}></Image>
        </View>
    );
}
