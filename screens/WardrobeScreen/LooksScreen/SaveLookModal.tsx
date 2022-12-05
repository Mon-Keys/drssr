import React from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { View } from '../../../components/base/Themed';

import { useAppSelector } from '../../../hooks/useAppSelector';
import {
    newLook,
    selectCreateLook
} from '../../../reducers/looks/createLookReducer';
import { Layout } from '../../../styles';
import { useDispatch } from 'react-redux';
import { RootStackScreenProps } from '../../../types';
import {
    fetchUsersLooks,
    selectLook
} from '../../../reducers/looks/lookReducer';
import InputContainer, {
    getValue,
    InputFieldData
} from '../../../components/item/InputContainer';
import BaseButton from '../../../components/base/BaseButton';
import { GenerateRandomName, ICreateLook } from '../../../network/api/common';
// @ts-ignore

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    lookContainer: {
        flex: 1,
        minHeight: Layout.window.height * 0.6,
        marginTop: Layout.margins.default,
        borderRadius: 14,
        resizeMode: 'center'
    },
    lookContainerInactive: {
        flex: 1,
        minHeight: Layout.window.height * 0.6,
        marginTop: Layout.margins.default,
        marginHorizontal: Layout.margins.small,
        opacity: 0.5,
        borderRadius: 14,
        resizeMode: 'center'
    },
    infoContainer: {
        marginVertical: Layout.margins.default
    },
    buttonSave: {
        marginBottom: Layout.margins.default
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
}: RootStackScreenProps<'SaveLook'>) {
    const lookSelector = useAppSelector(selectCreateLook);

    const dispatch = useDispatch();

    const looks = useAppSelector(selectLook);

    const fields: Array<InputFieldData> = [
        {
            key: 'name',
            title: 'Название образа',
            placeholder: 'Придумайте название образа',
            validationFunc: (text) => {
                if (text === '') {
                    return '';
                }
                if (text.length > 30) {
                    return 'Слишко длинное название';
                }
                return '';
            }
        },
        {
            key: 'description',
            title: 'Описание',
            placeholder: 'Добавьте описание для образа'
        }
    ];

    const addLook = () => {
        const name = getValue(fields, 'name');
        const description = getValue(fields, 'description');

        const look: ICreateLook = {
            img: lookSelector.look.img,
            filename: GenerateRandomName(),
            clothes: lookSelector.look.clothes.map((id) => {
                return {
                    id: id,
                    coords: {
                        x: 300,
                        y: 450
                    }
                };
            }),
            name: name,
            description: description
        };

        // @ts-ignore
        const newLook1: ILook = {
            img: lookSelector.look.img,
            filename: GenerateRandomName(),
            clothes: lookSelector.look.clothes,
            name: name,
            description: description
        };

        // @ts-ignore
        dispatch(newLook(newLook1)).then(() => {
            //@ts-ignore
            dispatch(fetchUsersLooks()).then(() => {
                //@ts-ignore
                navigation.navigate('Wardrobe');
            });
        });
    };

    return (
        <ScrollView
            nestedScrollEnabled={true}
            horizontal={false}
            style={{ paddingHorizontal: Layout.margins.small }}
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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <InputContainer
                        inputFields={fields}
                        style={styles.infoContainer}
                    />
                    <BaseButton
                        title="Сохранить"
                        onPress={addLook}
                        style={styles.buttonSave}
                    />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}
