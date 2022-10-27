import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import ImageMasker from '../components/ImageMasker';
// @ts-ignore
import ExpoDraw from 'expo-draw';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center'
    },
    expoDraw: {
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        position: 'absolute'
    }
});

export default function EditModal() {
    return (
        <View style={styles.container}>
            <ImageMasker
                imgURI={
                    'https://i.pinimg.com/originals/c0/e9/af/c0e9af25ffdc4b7275de7690ff62c193.jpg'
                }
                maskURI={
                    'https://www.pngall.com/wp-content/uploads/5/Shape-PNG-Image.png'
                }
            />

            <Text> экран владимира лункина </Text>

            <ExpoDraw
                containerStyle={styles.expoDraw}
                color={'red'}
                strokeWidth={4}
                enabled={true}
            />
        </View>
    );
}
