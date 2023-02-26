import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors, Layout } from '../../styles';
import IconButton from '../../components/base/IconButton';
import { AntDesign } from '@expo/vector-icons';
import Back from '../icons/back';

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: Layout.margins.small
    },
    flexZero: {
        flex: 0,
        width: 24
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    }
});

export interface HeaderProps {
    title: string;
    style?: ViewStyle;
    back: () => void;
    icon?: ReactElement<any, any>;
}

export default function Header(props: HeaderProps) {
    return (
        <View style={props.style}>
            <View style={styles.headerContainer}>
                <IconButton
                    style={styles.flexZero}
                    icon={<Back color={Colors.base.black} />}
                    onPress={props.back}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText}>{props.title}</Text>
                </View>
                {props.icon ? (
                    <IconButton style={styles.flexZero} icon={props.icon} />
                ) : (
                    <View style={styles.flexZero} />
                )}
            </View>
        </View>
    );
}
