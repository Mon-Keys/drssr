import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../base/Themed';
import { Layout } from '../../styles';
import Photo from "./Photo";
import AddPhotoButton from "./AddPhotoButton";
import * as ImagePicker from "expo-image-picker";
import {addPhotoForNewPost, deletePhotoForNewPost, selectNewPosts} from "../../reducers/posts/postReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

const styles = StyleSheet.create({
    columnWrapper: {
        minWidth: 342,
        margin: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

interface IPhoto {
    img: string;
    imgData?: ImagePicker.ImageInfo;
}

interface PhotosPreviewProps {
    photo: IPhoto;
    style?: ViewStyle;
}

export default function PhotosPreview(props: PhotosPreviewProps) {
    const newPost = useAppSelector(selectNewPosts);

    const dispatch = useAppDispatch();

    const getPhotos = () => {
        const photos: Array<IPhoto> = [{img: 'button'}];
        newPost.previews_paths.forEach((item) => {
            photos.push({
                img: '',
                imgData: item
            })
        })
        photos.push({img: props.photo.img})
        return photos
    }
    const addPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        if (!result.cancelled) {
            dispatch(addPhotoForNewPost(result));
        }
    }
    const deletePhoto = (index: number) => {
        dispatch(deletePhotoForNewPost(index-1)); // вычитаем 1 из-за карточки AddPhotoButton
    }

    return (
        <View style={props.style}>
            <FlatList
                style={{ marginVertical: Layout.margins.default }}
                contentContainerStyle={{ marginHorizontal: Layout.margins.default }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={getPhotos()}
                renderItem={({ item, index }) => item.img !== 'button' ? (
                    <Photo
                        imgPath={item.img}
                        imgData={item.imgData}
                        onLongPress={() => deletePhoto(index)}
                        style={{ marginRight: Layout.margins.default }}
                    />
                ) : (
                    <AddPhotoButton
                        style={{ marginRight: Layout.margins.default }}
                        onPress={addPhoto}
                    />
                )}
            />
        </View>
    );
}
