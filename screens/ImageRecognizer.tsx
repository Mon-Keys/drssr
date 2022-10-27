import React from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import InputField from '../components/InputField';

import { Text, View } from '../components/Themed';
import ImageMasker from '../components/ImageMasker';
import StyledButton from '../components/StyledButton';
import Person from '../components/icons/person';
import DatePicker from 'react-native-date-picker';
import { loginUser, selectUser } from '../reducers/userReducer';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ILoginData } from '../network';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function ImageRecognizerScreen({
    navigation
}: RootStackScreenProps<'ImageRecognizer'>) {
    // const cameraPermission = await Camera.getCameraPermissionStatus()
    // const microphonePermission = await Camera.getMicrophonePermissionStatus()
    const devices = useCameraDevices();
    const device = devices.back;

    if (device == null) return <ActivityIndicator />;
    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center'
    }
});
