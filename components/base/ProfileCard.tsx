import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import ProfileVerified from '../icons/profileVerified';
import Location from '../icons/location';
import Settings from '../icons/settings';
import Share from '../icons/share';
import { Layout, Abstracts } from '../../styles';

const styles = StyleSheet.create({
    cardContainer: {
        height: 220,
        maxHeight: 220,
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: Layout.cornerRadius
    },
    mountContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: Abstracts.profile.defaultWidth,
        height: 178,
        top: 220 - 178
    },
    image: {
        width: Abstracts.profile.avatarSize,
        height: Abstracts.profile.avatarSize,
        borderRadius: 50,
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: Colors.base.white
    },
    name: {
        fontSize: 24,
        fontFamily: 'proxima-nova'
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 48
    },
    descriptionContainer: {
        height: 52,
        width: 332,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 20
    },
    descriptionText: {
        color: Colors.base.black,
        fontSize: 16,
        fontFamily: 'proxima-nova'
    },
    bottomContainer: {
        flex: 1,
        top: 20,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    secondaryText: {
        color: Colors.base.darkgray,
        fontSize: 16,
        fontFamily: 'proxima-nova'
    },
    leftButton: {
        position: 'absolute',
        left: Layout.margins.default,
        top: Layout.margins.default
    },
    rightButton: {
        position: 'absolute',
        right: Layout.margins.default,
        top: Layout.margins.default
    }
});

export interface ProfileCardProps {
    avatarSrc: string;
    name: string;
    isVerified: boolean;
    subscribersAmount: number;
    location?: string;
    settingsAction: () => void;
    shareAction: () => void;
    description: string;
}

export const ProfileCard = (props: ProfileCardProps) => (
    <View style={styles.cardContainer}>
        <View style={styles.mountContainer}>
            <Pressable onPress={props.settingsAction}>
                <Settings
                    style={styles.leftButton}
                    color={Colors.base.darkgray}
                />
            </Pressable>
            <Share style={styles.rightButton} color={Colors.base.darkgray} />
            <View style={styles.nameContainer}>
                <Text style={styles.name}> {props.name} </Text>
                <ProfileVerified />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{props.description}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.secondaryText}>
                    {props.location}
                    <Location />
                </Text>
                <Text style={styles.secondaryText}>
                    {props.subscribersAmount} подписчиков
                </Text>
            </View>
        </View>
        <Image
            style={styles.image}
            source={{
                uri: 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
            }}
        />
    </View>
);
