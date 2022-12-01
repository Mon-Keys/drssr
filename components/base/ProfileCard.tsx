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
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: Layout.cornerRadius
    },
    mountContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: Abstracts.profile.defaultWidth,
        alignItems: 'center',
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
    headerContainer: {
        height: 40
    },
    name: {
        fontSize: 24,
        fontFamily: 'proxima-nova'
    },
    nameContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statsContainer: {
        height: 50,
    },
    descriptionContainer: {
        minHeight: 30,
        maxHeight: 60,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
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
    // const stats = [
    //     {
    //         value: '3,8К',
    //         desc: 'Подписчики'
    //     },
    //     {
    //         value: '5,4К',
    //         desc: 'Лайки'
    //     },
    //     {
    //         value: '7',
    //         desc: 'Публикации'
    //     }
    // ];

    return (
        <View style={styles.cardContainer}>
            <View style={{ height: 50 }} />
            <View style={styles.mountContainer}>
                <View style={styles.headerContainer} />
                <Pressable
                    style={styles.leftButton}
                    onPress={props.settingsAction}
                >
                    <Settings color={Colors.base.darkgray} />
                </Pressable>
                {/* <Share
                    style={styles.rightButton}
                    color={Colors.base.darkgray}
                /> */}
                <View style={styles.nameContainer}>
                    <Text style={styles.name}> {props.name} </Text>
                    {props.isVerified &&
                        <ProfileVerified color="white" />
                    }
                </View>
                {/* <View style={styles.statsContainer}>
                    <FlatList
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator} />
                        )}
                        horizontal={true}
                        data={stats}
                        renderItem={({ item }) => {
                            return <Stat value={item.value} desc={item.desc} />;
                        }}
                    />
                </View> */}
                <View style={styles.statsContainer}>
                    <Pressable style={styles.edit} onPress={props.editAction}>
                        <Text style={styles.editText}> Редактировать </Text>
                    </Pressable>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text numberOfLines={3} style={styles.descriptionText}>
                        {props.description}
                    </Text>
                </View>
                <View style={styles.bottomContainer} />
            </View>
            <Image
                style={styles.image}
                source={{
                    uri: props.avatarSrc !== './media/defaults/avatar.webp' ? getUri(props.avatarSrc) : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                }}
            />
        </View>
    );
};
