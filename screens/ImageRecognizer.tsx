import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Platform,
    StatusBar
} from 'react-native';

import { View } from '../components/Themed';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
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
