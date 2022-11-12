import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from '../../styles/Colors';

export interface CheapProps {
    name: string;
    isActive: boolean;
    onPress: () => void;
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: Colors.base.black,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactive: {
        backgroundColor: Colors.base.lightgray,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    },
    activeTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.white
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
