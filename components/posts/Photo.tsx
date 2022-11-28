import { View } from '../base/Themed';
import {
    GestureResponderEvent,
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import React from 'react';
import { Layout } from '../../styles';
import { getUri } from '../../network/const';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
    container: {
        height: 245,
        width: 150,
        borderRadius: Layout.cornerRadius
    },
    preview: {
        flex: 1,
        borderRadius: Layout.cornerRadius,
        resizeMode: 'cover'
    }
});

interface PhotoProps {
    imgData?: ImagePicker.ImageInfo;
    imgPath: string;
    onLongPress?: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
}

const Photo = (props: PhotoProps) => {
    return (
        <TouchableOpacity onLongPress={props.onLongPress} style={props.style}>
            <View style={styles.container}>
                {props.imgPath != '' ? (
                    <Image
                        style={styles.preview}
                        source={{
                            uri: getUri(props.imgPath)
                        }}
                    />
                ) : (
                    <Image
                        style={styles.preview}
                        source={{
                            uri: props.imgData?.uri
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default Photo;
