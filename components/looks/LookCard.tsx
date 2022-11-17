import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
    wardrobeImageBackground: {
        backgroundColor: Colors.base.white,
        height: 270,
        width: 160,
        borderRadius: 14,
        marginHorizontal: 5,
        marginVertical: 20
    },
    lookImage: {
        height: 270,
        width: 160,
        borderRadius: 14,
        resizeMode: 'contain'
    },
    lookText: {
        fontFamily: 'proxima-nova',
        fontSize: 16
    }
});

export interface LookCardProps {
    imgURI: string;
    name: string;
    callbackfn: () => void;
}

export const LookCard = (props: LookCardProps) => {
    console.log(props);

    return (
        <TouchableOpacity
            style={[styles.wardrobeImageBackground]}
            onLongPress={() => {}}
            onPress={props.callbackfn}
            delayLongPress={300}
        >
            <Image style={styles.lookImage} source={{ uri: props.imgURI }} />
            <Text style={styles.lookText}> {props.name} </Text>
        </TouchableOpacity>
    );
};
