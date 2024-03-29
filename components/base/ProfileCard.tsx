import { View } from '../base/Themed';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import ProfileVerified from '../icons/profileVerified';
import Settings from '../icons/settings';
import { Layout, Abstracts } from '../../styles';
// import { FlatList } from 'react-native-gesture-handler';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.base.transparent,
        alignItems: 'center'
    },
    mountContainer: {
        marginTop: 60,
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        // width: Abstracts.profile.defaultWidth,
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: Abstracts.profile.avatarSize,
        height: Abstracts.profile.avatarSize,
        borderRadius: Abstracts.profile.avatarSize,
        position: 'absolute',
        top: -Abstracts.profile.avatarSize * 0.5,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: Colors.base.white
    },
    name: {
        fontSize: 24,
        fontFamily: 'proxima-nova'
    },
    nameContainer: {
        marginTop: 50,
        marginBottom: Layout.margins.default,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statsContainer: {
        marginVertical: Layout.margins.small,
    },
    descriptionContainer: {
        marginBottom: Layout.margins.default,
        maxWidth: 300,
        justifyContent: 'center'
    },
    descriptionText: {
        color: Colors.base.black,
        fontSize: 14,
        fontFamily: 'proxima-nova',
        textAlign: 'center'
    },
    bottomContainer: {
        height: 20
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
    },
    separator: {
        marginVertical: 7,
        maxHeight: 300,
        width: 1,
        backgroundColor: Colors.base.darkgray
    },
    edit: {
        height: 45,
        width: 150,
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editText: {
        fontSize: 16,
        fontFamily: 'proxima-nova'
    }
});

export interface ProfileCardProps {
    avatarSrc: string;
    name: string;
    isVerified: boolean;
    subscribersAmount: number;
    settingsAction: () => void;
    shareAction: () => void;
    editAction: () => void;
    description: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.mountContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: props.avatarSrc !== './media/defaults/avatar.webp' ? getUri(props.avatarSrc) : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                    }}
                />
                <Pressable
                    style={styles.leftButton}
                    onPress={props.settingsAction}
                >
                    <Settings color={Colors.base.black} />
                </Pressable>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{props.name}</Text>
                    {props.isVerified &&
                        <ProfileVerified style={{ marginLeft: 7 }} color="white" />
                    }
                </View>
                <View style={styles.statsContainer}>
                    <Pressable style={styles.edit} onPress={props.editAction}>
                        <Text style={styles.editText}>Редактировать</Text>
                    </Pressable>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {props.description}
                    </Text>
                </View>
            </View>
        </View>
    );
};
