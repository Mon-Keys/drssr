import { View } from './Themed';
import {  StyleSheet, Text } from 'react-native';
import React from 'react';
import Exclamation from '../icons/exclamation';
import Colors from '../../styles/Colors';
import { Layout, Abstracts } from '../../styles';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: Abstracts.profile.defaultWidth,
        height: 250,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exclamation: {
        width: 60,
        height: 60,
        backgroundColor: Colors.base.yellow,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        width: 300,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descText: {
        fontSize: 24,
        fontFamily: 'proxima-nova'
    },
    subDescText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'proxima-nova',
        color: Colors.base.darkgray
    }
});


export const RequestStylist = () => (
    <View style={styles.mainContainer}>
        <View style={styles.exclamation}>
            < Exclamation />
        </View>
        <View style={styles.desc}>
            <Text style={styles.descText}> Заявка рассматривается </Text>
            <Text style={styles.subDescText}>
                {' '}
                Ваша заявка на статус стилиста рассматривается модерацией. Процесс
может занять от 1 до 24 часов.{' '}
            </Text>
        </View>
    </View>
);
