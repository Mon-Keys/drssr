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
    setParams: (x, y, z, scale, rotation) => void;
}

export const EditableImage = (props: EditableImageProps) => {
    const [zIndex, setZIndex] = React.useState(0);

    return (
        <View style={{ ...styles.imageContainer, zIndex: zIndex }}>
            <Gestures
                scalable={{
                    min: 0.33,
                    max: 3
                }}
                onChange={(event, styles) => {
                    console.log(styles.transform[0].scale);
                    console.log(styles.transform[1].rotate);
                    console.log(event.nativeEvent.pageX);
                    console.log(event.nativeEvent.pageY);
                    setZIndex(props.maxZIndex + 1);
                    props.setMaxZIndex();
                }}
                onEnd={(event, styles) => {
                    console.log(styles.transform[0].scale);
                    console.log(styles.transform[1].rotate);
                    console.log(event.nativeEvent.pageX);
                    console.log(event.nativeEvent.pageY);
                    setZIndex(props.maxZIndex + 1);
                    props.setMaxZIndex();
                    props.setParams(
                        event.nativeEvent.pageX,
                        event.nativeEvent.pageY,
                        props.maxZIndex + 1,
                        styles.transform[0].scale,
                        styles.transform[1].rotate
                    );
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
