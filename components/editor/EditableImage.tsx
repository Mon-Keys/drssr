import { View } from '../base/Themed';
import { Image, ImageProps, StyleSheet } from 'react-native';
import React from 'react';
// @ts-ignore
import Gestures from 'react-native-easy-gestures';

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    imageContainer: {
        backgroundColor: 'transparent'
    }
});

interface EditableImageProps extends ImageProps {
    imageURI?: string;
}

export const EditableImage = (props: EditableImageProps) => {
    console.log(props.imageURI);
    return (
        <View style={styles.imageContainer}>
            <Gestures>
                <Image {...props} />
            </Gestures>
        </View>
    );
};
