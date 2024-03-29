import React, { useState } from 'react';
import { Button, StyleSheet, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FileHost } from '../../network/const';
// import ImageUploading, { ImageListType } from "react-images-uploading";

export type Props = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chooseImageIcon: {
        width: 200,
        height: 200
    }
});

const CustomImagePicker: React.FC<Props> = ({}) => {
    // const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
    const [image, setImage] = useState<ImagePicker.ImagePickerResult>();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const createFormData = (photo: ImagePicker.ImagePickerResult) => {
        const data = new FormData();

        if (!photo.cancelled && photo.fileName && photo.type && photo.uri) {
            data.append('name', photo.fileName);
            data.append('type', photo.type);
            data.append(
                'uri',
                Platform.OS === 'ios'
                    ? photo.uri.replace('file://', '')
                    : photo.uri
            );
        }

        return data;
    };

    const handleUploadPhoto = () => {
        if (image !== undefined) {
            fetch(`${FileHost}upload'`, {
                method: 'POST',
                body: createFormData(image)
            });
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Выбрать фотографию" onPress={pickImage} />
            {/*@ts-ignore*/}
            {image && (
                <Image
                    //@ts-ignore
                    source={{ uri: image.uri }}
                    style={styles.chooseImageIcon}
                />
            )}
            {image && <Button title="Отправить" onPress={handleUploadPhoto} />}
        </View>
    );
};

export default CustomImagePicker;
