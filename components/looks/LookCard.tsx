import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from '../base/Themed';
import React from 'react';
import { Layout } from '../../styles';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Layout.margins.small
    },
    previewContainer: {
        height: 260,
        width: 160,
        borderRadius: Layout.cornerRadius
    },
    lookImage: {
        flex: 1,
        resizeMode: 'center',
        borderRadius: Layout.cornerRadius
    },
    lookText: {
        maxWidth: 160,
        marginTop: Layout.margins.micro,
        fontFamily: 'proxima-nova',
        fontSize: 12
    }
});

export interface LookCardProps {
    imgURI: string;
    name: string;
    callbackfn: () => void;
}

export const LookCard = (props: LookCardProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onLongPress={() => {}}
            onPress={props.callbackfn}
            delayLongPress={300}
        >
            <View style={styles.previewContainer}>
                <Image
                    style={styles.lookImage}
                    source={{ uri: props.imgURI }}
                />
            </View>
            <Text style={styles.lookText} numberOfLines={1}>
                {' '}
                {props.name}{' '}
            </Text>
        </TouchableOpacity>
    );
};
