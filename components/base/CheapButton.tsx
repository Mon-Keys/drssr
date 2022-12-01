import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import { Layout } from '../../styles';

export interface CheapProps {
    name: string;
    isActive: boolean;
    onPress: () => void;
}

const styles = StyleSheet.create({
    active: {
        height: 35,
        backgroundColor: Colors.base.black,
        marginHorizontal: Layout.margins.default,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        borderRadius: 14
    },
    inactive: {
        backgroundColor: 'transparent',
        height: 35,
        marginHorizontal: Layout.margins.default,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        borderRadius: 14
    },
    activeTitle: {
        fontSize: 12,
        fontFamily: 'proxima-nova',
        color: Colors.base.white,
        marginHorizontal: 18,
        marginVertical: 10,
        lineHeight: 14
    },
    inactiveTitle: {
        fontSize: 12,
        fontFamily: 'proxima-nova',
        color: Colors.base.black,
        marginHorizontal: 18,
        lineHeight: 14
    }
});

const Cheap = (props: CheapProps) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={props.isActive ? styles.active : styles.inactive}>
                <Text
                    style={
                        props.isActive
                            ? styles.activeTitle
                            : styles.inactiveTitle
                    }
                >
                    {' '}
                    {props.name}{' '}
                </Text>
            </View>
        </Pressable>
    );
};

export default Cheap;
