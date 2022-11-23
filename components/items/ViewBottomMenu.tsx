import React, { ReactNode } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Colors } from '../../styles';
import { choosePhoto } from '../../reducers/items/clothesReducer';
import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';
import StyledButton from '../base/StyledButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export interface ViewBottomMenuProps {
    children: ReactNode;
    modalRef: React.RefObject<BottomSheetModalMethods>;
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    selectContainer: {
        backgroundColor: Colors.base.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default function ViewBottomMenu(props: ViewBottomMenuProps) {
    const dispatch = useAppDispatch();

    const navigation = useNavigation<RootNavigation>();

    const snapPoints = React.useMemo(() => ['30%'], []);

    const closeModal = () => {
        if (props.modalRef.current) {
            props.modalRef.current.close();
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        if (!result.cancelled) {
            dispatch(choosePhoto(result));
            navigation.navigate('AddItem');
            closeModal();
        }
    };

    return (
        <BottomSheetModalProvider>
            {props.children}
            <BottomSheetModal
                ref={props.modalRef}
                index={0}
                snapPoints={snapPoints}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.31)' }}
                handleIndicatorStyle={{ backgroundColor: Colors.base.black }}
            >
                <View style={styles.selectContainer}>
                    <Pressable onPress={closeModal}>
                        <Entypo
                            name="cross"
                            size={24}
                            color={Colors.base.black}
                        />
                    </Pressable>
                    <StyledButton title={'Добавить вещь'} onPress={pickImage} />
                    {/*<StyledButton*/}
                    {/*    title={'Камера'}*/}
                    {/*    onPress={() => {*/}
                    {/*        navigation.navigate('ImageRecognizer');*/}
                    {/*        closeModal();*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <StyledButton
                        title={'Создать лук'}
                        onPress={() => {
                            navigation.navigate('CreateLook');
                            closeModal();
                        }}
                    />
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
