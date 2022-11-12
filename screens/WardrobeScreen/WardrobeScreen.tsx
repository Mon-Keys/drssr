import React, { ReactElement, useEffect } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Pressable,
    Platform,
    StatusBar
} from 'react-native';

import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { View } from '../../components/base/Themed';
import { RootTabScreenProps } from '../../types';
import StyledButton from '../../components/base/StyledButton';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { choosePhoto } from '../../reducers/itemEditorReducer';
import ItemsScreen from './ItemsScreen/ItemsWardrobeScreen';
import LooksScreen from './LooksScreen/LooksWardrobeScreen';
import { fetchUsersClothes } from '../../reducers/clothesReducer';
import Cheaps from '../../components/base/Cheaps';

const styles = StyleSheet.create({
    cheapContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.base.black
    },
    mainContainer: {
        flex: 10,
        backgroundColor: Colors.base.black
    },
    bottomSheet: {
        backgroundColor: Colors.base.black
    },
    contentContainer: {
        backgroundColor: Colors.base.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});

const menuItems = [
    {
        name: 'Мои вещи',
        component: <ItemsScreen />
    },
    {
        name: 'Мои луки',
        component: <LooksScreen />
    }
];

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

    const [currentScreen, setCurrentScreen] = React.useState<
        ReactElement<any, any>
    >(menuItems[0].component);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.cheapContainer}>
                    <Cheaps
                        cheaps={menuItems}
                        currentScreen={(component) => {
                            setCurrentScreen(component);
                        }}
                    />
                    <Pressable onPress={openModal}>
                        <AntDesign
                            name="pluscircle"
                            size={36}
                            color={Colors.base.white}
                        />
                    </Pressable>
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
                <View style={styles.contentContainer}>
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
