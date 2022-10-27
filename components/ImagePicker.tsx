import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import ImageUploading, { ImageListType } from "react-images-uploading";

export type Props = {};

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

        console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const createFormData = (
        photo: ImagePicker.ImagePickerResult,
        body = {}
    ) => {
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
        console.log('ssssssssssssssss');
        if (image != undefined) {
            fetch('http://leonidperl.in:5001/upload', {
                method: 'POST',
                body: createFormData(image)
            })
                .then((response) => console.log(response))
                .then((response) => {
                    console.log('response', response);
                })
                .catch((error) => {
                    console.log('error', error);
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
                    style={{ width: 200, height: 200 }}
                />
            )}
            {image && <Button title="Отправить" onPress={handleUploadPhoto} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CustomImagePicker;
