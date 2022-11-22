import React, { ReactNode } from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

import {Colors, Layout} from '../../styles';
import {choosePhoto, selectUserItems} from '../../reducers/items/clothesReducer';
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
import {useAppSelector} from "../../hooks/useAppSelector";

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
        justifyContent: 'space-around'
    },
    headerMenuContainer: {
        flexDirection: 'row',
        marginHorizontal: Layout.margins.default,
        alignItems: 'center',
    },
    headerMenu: {
        flex: 1,

        fontSize: Layout.fontSize.default,
        color: Colors.base.black,
    },
    bodyMenuContainer: {
        margin: Layout.margins.default,
    },
    bodyMenuButton: {
        paddingVertical: Layout.margins.small,
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold',
        color: Colors.base.black,
    }
});

export default function ViewBottomMenu(props: ViewBottomMenuProps) {
    const dispatch = useAppDispatch();

    const navigation = useNavigation<RootNavigation>();

    const clothes = useAppSelector(selectUserItems);
    const hasClothes: boolean = clothes && clothes.length > 0;

    const snapPoints = React.useMemo(() => ['25%'], []); // с камерой 30%

    const closeMenu = () => {
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
            closeMenu();
        }
    };

    const openCamera = () => {
        navigation.navigate('ImageRecognizer');
        closeMenu();
    }

    const createLook = () => {
        navigation.navigate('CreateLook');
        closeMenu();
    }

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
                    <View style={styles.headerMenuContainer}>
                        <Text style={styles.headerMenu}>Обновление гардероба</Text>
                        <Pressable onPress={closeMenu}>
                            <Entypo
                                name="cross"
                                size={24}
                                color={Colors.base.black}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.bodyMenuContainer}>
                        <Pressable onPress={pickImage} >
                            <Text style={styles.bodyMenuButton}>Добавить вещь</Text>
                        </Pressable>
                        {/*<Pressable onPress={openCamera} >*/}
                        {/*    <Text style={styles.bodyMenuButton}>Сфотографировать вещь</Text>*/}
                        {/*</Pressable>*/}
                        {hasClothes ? (
                            <>
                                <Pressable onPress={createLook} >
                                    <Text style={styles.bodyMenuButton}>Создать образ</Text>
                                </Pressable>
                            </>
                        ) : null}
                    </View>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
