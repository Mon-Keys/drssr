import { View } from './Themed';
import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import ProfileVerified from '../icons/profileVerified';
import Colors from '../../styles/Colors';
import { Layout, Abstracts } from '../../styles';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: Abstracts.profile.defaultWidth,
        height: 300,
        top: 10,
        alignItems: 'center'
    },
    button: {
        width: 332,
        height: 40,
        top: 200 - 178,
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'proxima-nova'
    },
    desc: {
        width: 250,
        height: 100,
        top: 60,
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
        <Pressable onPress={props.becomeStylist}>
            <View style={styles.button}>
                <ProfileVerified color="white" />
                <Text style={styles.buttonText}> Стать стилистом </Text>
            </View>
        </Pressable>
        <View style={styles.desc}>
            <Text style={styles.descText}> Станьте стилистом </Text>
            <Text style={styles.subDescText}>
                {' '}
                Для того, чтобы получить возможность создавать публикации,
                подайте заявку{' '}
            </Text>
        </View>
    </View>
);
