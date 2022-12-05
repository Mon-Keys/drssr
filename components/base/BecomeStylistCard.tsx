import { View } from './Themed';
import {Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ProfileVerified from '../icons/profileVerified';
import Colors from '../../styles/Colors';
import { Layout, Abstracts } from '../../styles';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: '100%',
        height: 300,
        marginTop: Layout.margins.default,
    },
    button: {
        height: 40,
        margin: Layout.margins.default,
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        marginLeft: Layout.margins.small,
        fontSize: Layout.fontSize.big,
        fontFamily: 'proxima-nova'
    },
    desc: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descText: {
        fontSize: 26,
        fontFamily: 'proxima-nova'
    },
    subDescText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'proxima-nova',
        color: Colors.base.darkgray
    }
});

export interface BecomeStylistCardProps {
    becomeStylist: () => void;
}

export const BecomeStylistCard = (props: BecomeStylistCardProps) => (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={props.becomeStylist} activeOpacity={0.4}>
            <View style={styles.button}>
                <ProfileVerified color="white" />
                <Text style={styles.buttonText}>Стать стилистом</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.desc}>
            <View style={{ maxWidth: 250 }}>
                <Text style={styles.descText}> Станьте стилистом </Text>
                <Text style={styles.subDescText}>
                    {' '}
                    Для того, чтобы получить возможность создавать публикации,
                    подайте заявку{' '}
                </Text>
            </View>
        </View>
    </View>
);
