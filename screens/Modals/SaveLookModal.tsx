import { SimpleLineIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import InputField from '../../components/base/InputField';
import StyledButton from '../../components/base/StyledButton';
import { View } from '../../components/base/Themed';

import { useAppSelector } from '../../hooks/useAppSelector';
import { newLook, selectCreateLook } from '../../reducers/createLookReducer';
import { Colors } from '../../styles';
import { useDispatch } from 'react-redux';
import { ILookData } from '../../network';
import { RootStackScreenProps } from '../../types';
import { fetchUsersLooks, selectLook } from '../../reducers/lookReducer';
// @ts-ignore

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    lookContainer: {
        width: 354,
        height: 442,
        borderRadius: 14,
        resizeMode: 'contain'
    },
    lookContainerInactive: {
        width: 354,
        height: 442,
        opacity: 0.5,
        borderRadius: 14,
        resizeMode: 'contain'
    },
    infoContainer: {
        marginTop: 14,
        width: 354,
        height: 176,
        borderRadius: 14,
        resizeMode: 'contain',
        backgroundColor: Colors.base.white,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function SaveLookModal({
    navigation
}: RootStackScreenProps<'CreateLook'>) {
    const lookSelector = useAppSelector(selectCreateLook);
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const dispatch = useDispatch();

    const looks = useAppSelector(selectLook);

    const addLook = () => {
        console.log({ name, description });
        const look: ILookData = {
            img: lookSelector.look.img,
            filename: `${name}${description}${Math.floor(
                Math.random() * 100
            )}.jpg`,
            clothes: [
                {
                    id: 1,
                    coords: {
                        x: 300,
                        y: 450
                    }
                }
            ],
            description: name + ' ' + description
        };

        // @ts-ignore
        dispatch(newLook(look)).then(() => {
            console.log('success');
            //@ts-ignore
            dispatch(fetchUsersLooks()).then(() => {
                //@ts-ignore
                navigation.navigate('Wardrobe');
            });
        });
    };

    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={'position'}
            keyboardVerticalOffset={50}
        >
            <View style={styles.container}>
                <View style={styles.lookContainer}>
                    <Image
                        style={
                            lookSelector.status === 'pending' ||
                            looks.status === 'pending'
                                ? styles.lookContainerInactive
                                : styles.lookContainer
                        }
                        source={{
                            uri: `data:image/jpg;base64,${lookSelector.look.img}`
                        }}
                    />
                    {lookSelector.status === 'pending' ||
                    looks.status === 'pending' ? (
                        <ActivityIndicator
                            size="large"
                            style={styles.indicator}
                        />
                    ) : null}
                </View>
                <View style={styles.infoContainer}>
                    <InputField
                        placeholder="Введите название лука"
                        placeholderTextColor={Colors.base.darkgray}
                        value={name}
                        onChangeText={setName}
                        icon={
                            <MaterialIcons
                                name="drive-file-rename-outline"
                                size={24}
                                color="black"
                            />
                        }
                    />
                    <InputField
                        placeholder="Введите описание лука"
                        placeholderTextColor={Colors.base.darkgray}
                        value={description}
                        onChangeText={setDescription}
                        icon={
                            <SimpleLineIcons
                                name="speech"
                                size={24}
                                color="black"
                            />
                        }
                    />
                    <StyledButton title="Добавить" onPress={addLook} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
