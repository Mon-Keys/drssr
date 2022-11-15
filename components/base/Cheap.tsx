import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import {Layout} from "../../styles";

export interface CheapProps {
    name: string;
    isActive: boolean;
    onPress: () => void;
}

const styles = StyleSheet.create({
    active: {
        height: 36,
        marginHorizontal: Layout.margins.default,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactive: {
        backgroundColor: Colors.base.lightgray,
        height: 36,
        marginHorizontal: Layout.margins.default,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    },
    inactiveTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.darkgray
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
