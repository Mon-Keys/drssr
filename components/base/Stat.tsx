import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from '../../styles/Colors';

export interface CheapProps {
    value: string;
    desc: string;
}

const styles = StyleSheet.create({
    statContainer: {
        height: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 13,
    },
    valueText: {
        color: Colors.base.black,
        fontSize: 22,
        fontFamily: 'proxima-nova',
        textAlign: 'center',
    },
    descriptionText: {
        color: Colors.base.darkgray,
        fontSize: 16,
        fontFamily: 'proxima-nova',
        textAlign: 'center',
    },
});

const Stat = (props: CheapProps) => {
    return (
        <View style={styles.statContainer}>
            <Text style={styles.valueText}>{props.value}</Text>
            <Text style={styles.descriptionText}>{props.desc}</Text>
        </View>
    );
};

export default Stat;
