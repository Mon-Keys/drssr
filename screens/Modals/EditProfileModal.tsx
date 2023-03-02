import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Pressable,
    Platform,
    StatusBar
} from 'react-native';
import { View } from '../../components/base/Themed';
import { Colors } from '../../styles';
import { Abstracts } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
    addAvatar,
    deleteAvatar,
    selectUser,
    updateUserData
} from '../../reducers/userReducer';
import { useAppSelector } from '../../hooks/useAppSelector';
import InputFieldForEdit from '../../components/base/InputFieldForEdit';
import * as ImagePicker from 'expo-image-picker';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        backgroundColor: Colors.base.lightgray
    },
    tempContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.transparent
    },
    image: {
        width: Abstracts.profile.avatarSize,
        height: Abstracts.profile.avatarSize,
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: Colors.base.white
    },
    clickableText: {
        fontSize: 16,
        fontFamily: 'proxima-nova'
    },
    cancel: {
        height: 45,
        backgroundColor: Colors.base.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        left: 10
    },
    submit: {
        height: 45,
        backgroundColor: Colors.base.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10
    },
    uploadPhoto: {
        height: 45,
        backgroundColor: Colors.base.transparent,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        top: 5,
        height: 50,
        fontSize: 12,
        fontFamily: 'proxima-nova'
    }
});

export default function EditProfileModalScreen() {
    const user = useAppSelector(selectUser);
    const userData = user.userData;

    const [name, setName] = React.useState<string>(userData.name);
    const [desc, setDesc] = React.useState<string>(
        userData.description ? userData.description : ''
    );

    const navigation = useNavigation<RootStackParamList>();

    const dispatch = useAppDispatch();

    const updateProfile = () => {
        console.log(user.status);
        dispatch(
            updateUserData({
                nickname: userData.nickname,
                email: userData.email,
                name: name,
                birth_date: userData.birthDate
                    ? userData.birthDate
                    : '2001-06-29',
                description: desc
            })
        ).then(() => {
            if (user.status === 'resolved') {
                navigation.goBack();
            }
        });
    };

    const cancel = () => {
        // dispatch(deleteAvatar())
        navigation.goBack();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        if (!result.cancelled) {
            dispatch(
                addAvatar({
                    file: result
                })
            );
            // .then( () => {console.log(user.userData)});
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tempContainer}>
                <Pressable style={styles.cancel} onPress={cancel}>
                    <Text style={styles.clickableText}> Отмена </Text>
                </Pressable>
                <Pressable style={styles.submit} onPress={updateProfile}>
                    <Text style={styles.clickableText}> Готово </Text>
                </Pressable>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            userData.avatar !== './media/defaults/avatar.webp'
                                ? getUri(userData.avatar)
                                : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                    }}
                />
                <Pressable style={styles.uploadPhoto} onPress={pickImage}>
                    <Text style={styles.clickableText}>
                        Загрузить новое фото
                    </Text>
                </Pressable>
                <InputFieldForEdit
                    placeholderTextColor={Colors.base.darkgray}
                    placeholder={'Имя'}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.text}> Введите ваше имя</Text>
                <InputFieldForEdit
                    placeholderTextColor={Colors.base.darkgray}
                    placeholder={'Описание'}
                    value={desc}
                    onChangeText={setDesc}
                />
                <Text style={styles.text}>
                    Расскажите о себе. Почему клиенты выбирают вас?
                </Text>
            </View>
        </View>
    );
}
