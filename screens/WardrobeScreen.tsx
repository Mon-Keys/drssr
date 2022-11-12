import React, { ReactElement, useEffect } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Pressable,
    Platform,
    StatusBar
} from 'react-native';

import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';
import { View } from '../components/base/Themed';
import { RootTabScreenProps } from '../types';
import StyledButton from '../components/base/StyledButton';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { choosePhoto } from '../reducers/itemEditorReducer';
import LooksScreen from './LooksWardrobeScreen';
import { fetchUsersClothes } from '../reducers/clothesReduser';
import Cheaps from '../components/base/Cheaps';
import ClothingCategoriesScreen from "./ClothingCategoriesScreen";
import IconButton from "../components/base/IconButton";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.base.lightgray,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        display: 'flex',
        flexDirection: 'column',
    },
    headerContainer: {
        flex: 0,
        margin: 14,
        marginBottom: 7,

        display: 'flex',
        flexDirection: 'row',

        backgroundColor: Colors.base.lightgray, // TODO delete
    },
    buttonPlus: {
        backgroundColor: Colors.base.lightgray, // TODO delete
        width: 36,
    },
    mainContainer: {
        flex: 1,
    },

    bottomSheet: {
        backgroundColor: Colors.base.black,
    },
    selectContainer: {
        backgroundColor: Colors.base.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default function WardrobeScreen({
    navigation
}: RootTabScreenProps<'Wardrobe'>) {
    const dispatch = useAppDispatch();

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(() => ['40%'], []);

    const openModal = () => {
        // @ts-ignore
        bottomSheetModalRef.current.present();
    };

    const closeModal = () => {
        // @ts-ignore
        bottomSheetModalRef.current.close();
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1
        });
        dispatch(choosePhoto(result));
        navigation.navigate('AddItem');
    };

    useEffect(() => {
        dispatch(fetchUsersClothes());
    }, [dispatch]);

    const menuItems = [
        {
            name: 'Вещи',
            component: <ClothingCategoriesScreen />
        },
        {
            name: 'Образы',
            component: <LooksScreen />
        }
    ];

    const [currentScreen, setCurrentScreen] = React.useState<
        ReactElement<any, any>
    >(menuItems[0].component);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.buttonPlus}/>
                    <Cheaps
                        cheaps={menuItems}
                        currentScreen={(component) => {
                            setCurrentScreen(component);
                        }}
                    />
                    <IconButton title="plus" onPress={openModal} size={styles.buttonPlus.width} />
                </View>
                <View style={styles.mainContainer}>{currentScreen}</View>
            </SafeAreaView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                style={styles.bottomSheet}
                backgroundStyle={{ backgroundColor: Colors.base.black }}
                handleIndicatorStyle={{ backgroundColor: Colors.base.white }}
            >
                <View style={styles.selectContainer}>
                    <Pressable onPress={closeModal}>
                        <Entypo
                            name="cross"
                            size={24}
                            color={Colors.base.white}
                        />
                    </Pressable>
                    <StyledButton
                        title={'Добавить лук'}
                        onPress={() => {
                            navigation.navigate('CreateLook');
                        }}
                    />
                    <StyledButton
                        title={'Камера'}
                        onPress={() => {
                            navigation.navigate('ImageRecognizer');
                        }}
                    />
                    <StyledButton title={'Из библиотеки'} onPress={pickImage} />
                    <StyledButton title={'Найти'} />
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
