import React from 'react';
import {StyleSheet, Text, Platform, StatusBar, ScrollView, Image} from 'react-native';
import { View } from '../../components/base/Themed';
import StyledButton from '../../components/base/StyledButton';
import { logoutUser } from '../../reducers/userReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {Colors, Layout} from '../../styles';
import {getUri} from "../../network/const";
import BaseButton from "../../components/base/BaseButton";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectLooks} from "../../reducers/lookReducer";
import {selectUserItems} from "../../reducers/items/clothesReducer";
import {useNavigation, useRoute} from "@react-navigation/native";
import {CreatePostRouteProp, TapBarNavigation} from "../../types";
import {ICreatePost} from "../../network/api/common";
import {createPost} from "../../reducers/posts/createPost";
import InputContainer, {getValue, InputFieldData} from "../../components/item/InputContainer";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.base.lightgray
    },
    previewContainer: {
        height: 450,
        margin: Layout.margins.default,
        borderRadius: Layout.cornerRadius,
        backgroundColor: 'red'
    },
    lookImage: {
        flex: 1,
        resizeMode: 'cover', // TODO временно пока луки маленькие
        borderRadius: Layout.cornerRadius
    },
    descriptionContainer: {
        backgroundColor: Colors.base.white,
        marginHorizontal: Layout.margins.default,
        borderRadius: Layout.cornerRadius
    },
    lookText: {
        marginVertical: Layout.margins.small,
        marginHorizontal: Layout.margins.default,

        fontFamily: 'proxima-nova',
        fontSize: Layout.fontSize.default
    },
    button: {
        margin: Layout.margins.default
    },
    inputContainer: {
        marginHorizontal: Layout.margins.default
    }
});

export default function CreatePostModal() {
    const navigation = useNavigation<TapBarNavigation>();
    const route = useRoute<CreatePostRouteProp>();

    const { type, id } = route.params;

    const dispatch = useAppDispatch();

    let defaultPreview = '';

    switch (type) {
        case 'look': {
            const looks = useAppSelector(selectLooks);
            const look = looks.find((item) => item.id == id) || looks[0]; // не гуд так делать, но как-то похуй, работать будет

            defaultPreview = look.img_path;
            break;
        }
        case 'clothes': {
            const clothes = useAppSelector(selectUserItems);
            const item = clothes.find((item) => item.id == id) || clothes[0]; // не гуд так делать, но как-то похуй, работать будет

            defaultPreview = item.img_path;
            break;
        }
    }

    const fields: Array<InputFieldData> = [
        {key: 'name', title: 'Название', placeholder: 'Дайте название публикации'},
        {key: 'description', title: 'Описание', placeholder: 'Расскажите подробнее о вашем образе'},
        {key: 'price', title: 'Цена', placeholder: 'Укажите цену образа'},
    ];

    const publish = () => {
        const post: ICreatePost = {
            element_id: id,
            type: type,
            description: getValue(fields, 'description'),
            // previews: [look.img_path],
        };
        dispatch(createPost(post));
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
                <View style={styles.previewContainer}>
                    <Image
                        style={styles.lookImage}
                        source={{ uri: getUri(defaultPreview) }}
                    />
                </View>
                <InputContainer inputFields={fields} style={styles.inputContainer}/>
                <BaseButton
                    title={'Опубликовать'}
                    style={styles.button}
                    onPress={publish}
                />
            </ScrollView>
        </View>
    );
}
