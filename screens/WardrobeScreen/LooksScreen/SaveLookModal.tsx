import React from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator, ScrollView
} from 'react-native';
import { View } from '../../../components/base/Themed';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { newLook, selectCreateLook } from '../../../reducers/createLookReducer';
import { Layout } from '../../../styles';
import { useDispatch } from 'react-redux';
import { ILookData } from '../../../network';
import { RootStackScreenProps } from '../../../types';
import { fetchUsersLooks, selectLook } from '../../../reducers/lookReducer';
import InputContainer, {getValue, InputFieldData} from "../../../components/item/InputContainer";
import BaseButton from "../../../components/base/BaseButton";
import {GenerateRandomName} from "../../../network/api/common";
// @ts-ignore

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    lookContainer: {
        width: 354,
        height: 442,
        marginVertical: Layout.margins.default,
        borderRadius: 14,
        resizeMode: 'center'
    },
    lookContainerInactive: {
        width: 354,
        height: 442,
        marginVertical: Layout.margins.default,
        opacity: 0.5,
        borderRadius: 14,
        resizeMode: 'center'
    },
    infoContainer: {
        width: 354,
        marginVertical: Layout.margins.default
    },
    buttonSave: {
      marginBottom: Layout.margins.default,
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
        // {key: 'name', title: 'Название образа', placeholder: 'Придумайте название образа'},
        {key: 'description', title: 'Описание', placeholder: 'Добавьте описание для образа'},
    ]

    const addLook = () => {
        // const name = getValue(fields, 'name');
        const description = getValue(fields, 'description');

        const look: ILookData = {
            img: lookSelector.look.img,
            filename: GenerateRandomName(),
            clothes: [
                {
                    id: 1,
                    coords: {
                        x: 300,
                        y: 450
                    }
                }
            ],
            description: description
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
        <ScrollView nestedScrollEnabled={true} horizontal={false} >
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
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <InputContainer inputFields={fields} style={styles.infoContainer}  />
                    <BaseButton title='Сохранить' onPress={addLook} style={styles.buttonSave} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}
