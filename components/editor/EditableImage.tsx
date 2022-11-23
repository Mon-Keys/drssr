import { View } from '../base/Themed';
import { Image, ImageProps, Pressable, StyleSheet } from 'react-native';
import React from 'react';
// @ts-ignore
import Gestures from 'react-native-easy-gestures';

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    imageContainer: {
        backgroundColor: 'transparent'
    }
});

interface EditableImageProps extends ImageProps {
    imageURI?: string;
    maxZIndex: number;
    setMaxZIndex: () => void;
    onLongPress: () => void;
}

export const EditableImage = (props: EditableImageProps) => {
    const [zIndex, setZIndex] = React.useState(0);

    return (
        <View style={{ ...styles.imageContainer, zIndex: zIndex }}>
            <Gestures
                onChange={() => {
                    setZIndex(props.maxZIndex + 1);
                    props.setMaxZIndex();
                }}
            >
                <Pressable
                    delayLongPress={500}
                    onLongPress={() => {
                        props.onLongPress();
                    }}
                >
                    <Image {...props} />
                </Pressable>
            </Gestures>
        </View>
    );
};
