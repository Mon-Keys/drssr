import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../../components/base/Themed';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Colors, Layout } from '../../styles';
import BaseButton from '../../components/base/BaseButton';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectLooks } from '../../reducers/looks/lookReducer';
import { selectUserItems } from '../../reducers/items/clothesReducer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreatePostRouteProp, TapBarNavigation } from '../../types';
import { ICreatePost } from '../../network/api/common';
import { createPost } from '../../reducers/posts/createPost';
import InputContainer, {
    getValue,
    InputFieldData
} from '../../components/item/InputContainer';
import PhotosPreview from '../../components/posts/PhotosPreview';
import { clearNewPost, selectNewPosts } from '../../reducers/posts/postReducer';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.base.lightgray
    },
    photosContainer: {
        backgroundColor: 'transparent'
    },
    inputContainer: {
        marginHorizontal: Layout.margins.default
    },
    button: {
        margin: Layout.margins.default
    }
});

export default function CreatePostModal() {
    const newPost = useAppSelector(selectNewPosts);

    const navigation = useNavigation<TapBarNavigation>();
    const route = useRoute<CreatePostRouteProp>();

    const { type, id } = route.params;

    const dispatch = useAppDispatch();

    let defaultPreview = '';
    let defaultName = '';
    let defaultDescription = '';

    switch (type) {
        case 'look': {
            const looks = useAppSelector(selectLooks);
            const look = looks.find((item) => item.id == id) || looks[0]; // не гуд так делать, но как-то похуй, работать будет

            defaultPreview = look.img_path;
            defaultName = look.name || '';
            defaultDescription = look.description || '';
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
        {
            key: 'name',
            title: 'Название',
            placeholder: 'Дайте название публикации',
            value: defaultName
        },
        {
            key: 'description',
            title: 'Описание',
            placeholder: 'Расскажите подробнее о вашем образе',
            value: defaultDescription
        },
        // { key: 'price', title: 'Цена', placeholder: 'Укажите цену образа' }
    ];

    const publish = () => {
        const post: ICreatePost = {
            element_id: id,
            type: type,
            name: getValue(fields, 'name'),
            description: getValue(fields, 'description'),
            previews: newPost.previews_paths.map<string>(
                (item) => item.base64 || ''
            )
            // previews: [look.img_path],
        };
        dispatch(createPost(post)).then(() => {
            dispatch(clearNewPost());
        });
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
                <PhotosPreview
                    photo={{ img: defaultPreview }}
                    style={styles.photosContainer}
                />
                <InputContainer
                    inputFields={fields}
                    style={styles.inputContainer}
                />
                <BaseButton
                    title={'Опубликовать'}
                    style={styles.button}
                    onPress={publish}
                />
            </ScrollView>
        </View>
    );
}
