import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from '../../constants/Colors';

export interface CheapProps {
    name: string;
    isActive: boolean;
    onPress: () => void;
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: Colors.base.white,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactive: {
        backgroundColor: Colors.base.black,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.white
    },
    activeTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    }
});

const Cheap = (props: CheapProps) => {
    return (
        <View style={props.isActive ? styles.active : styles.inactive}>
            <Pressable onPress={props.onPress}>
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
            </Pressable>
        </View>
    );
};

export default Cheap;
