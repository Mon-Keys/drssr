import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wardrobeImageBackground: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: 18,
        margin: 10
    },
    menuItemSize: { height: 100, width: 100 }
});

interface ItemEditorProps {
    imgURI: string;
    callbackfn: () => void;
}

export const Item = (props: ItemEditorProps) => {
    return (
        <TouchableOpacity
            style={[styles.wardrobeImageBackground]}
            onLongPress={() => {}}
            onPress={props.callbackfn}
            delayLongPress={300}
        >
            <Image style={styles.menuItemSize} source={{ uri: props.imgURI }} />
        </TouchableOpacity>
    );
};
