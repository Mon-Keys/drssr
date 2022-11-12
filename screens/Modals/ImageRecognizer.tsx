import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Platform,
    StatusBar
} from 'react-native';

import { View } from '../../components/base/Themed';

import { Camera, useCameraDevices } from 'react-native-vision-camera';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default function ImageRecognizerScreen(/*{
    navigation
}: RootStackScreenProps<'ImageRecognizer'>*/) {
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
