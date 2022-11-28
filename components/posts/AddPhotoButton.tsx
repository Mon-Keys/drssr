import { View } from '../base/Themed';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import React from 'react';
import { Colors, Layout } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import Camera from '../icons/camera';
import * as ImagePicker from 'expo-image-picker';
import { choosePhoto } from '../../reducers/items/clothesReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addPhotoForNewPost } from '../../reducers/posts/postReducer';

const styles = StyleSheet.create({
    container: {
        height: 245,
        width: 150,
        borderRadius: Layout.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {}
});

interface AddPhotoButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
}

const AddPhotoButton = (props: AddPhotoButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <View style={styles.container}>
                <Camera color={Colors.base.darkgray} />
            </View>
        </TouchableOpacity>
    );
};

export default AddPhotoButton;
