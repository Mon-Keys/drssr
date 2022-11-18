import React, { ReactElement, useEffect } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Pressable,
    Platform,
    StatusBar,
    View
} from 'react-native';
import { RootNavigation } from '../../types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Layout } from '../../styles';
import { choosePhoto } from '../../reducers/itemEditorReducer';
import { fetchUsersClothes } from '../../reducers/clothesReducer';
import CategoriesScreen from './ItemsScreen/CategoriesScreen';
import Cheaps from '../../components/base/Cheaps';
import IconButton from '../../components/base/IconButton';
import { AntDesign, Entypo } from '@expo/vector-icons';
import StyledButton from '../../components/base/StyledButton';
import LooksWardrobeScreen from './LooksScreen/LooksWardrobeScreen';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        display: 'flex',
        flexDirection: 'column'
    },
    headerContainer: {
        flex: 0,
        margin: Layout.margins.default,
        marginBottom: Layout.margins.small,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonPlus: {
        // backgroundColor: 'red'
    },
    mainContainer: {
        flex: 1
    },

    selectContainer: {
        backgroundColor: Colors.base.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default function WardrobeScreen() {
    const dispatch = useAppDispatch();

    const navigation = useNavigation<RootNavigation>();

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
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
            component: <CategoriesScreen />
        },
        {
            name: 'Образы',
            component: <LooksWardrobeScreen />
        }
    ];

    const [currentScreen, setCurrentScreen] = React.useState<
        ReactElement<any, any>
    >(menuItems[0].component);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <IconButton
                        style={styles.buttonPlus}
                        icon={
                            <AntDesign
                                name="search1"
                                size={24}
                                color={Colors.base.black}
                            />
                        }
                    />
                    <Cheaps
                        cheaps={menuItems}
                        currentScreen={(component) => {
                            setCurrentScreen(component);
                        }}
                    />
                    <IconButton
                        style={styles.buttonPlus}
                        icon={
                            <AntDesign
                                name="plus"
                                onPress={openModal}
                                size={24}
                                color={Colors.base.black}
                            />
                        }
                    />
                </View>
                <View style={styles.mainContainer}>{currentScreen}</View>
            </SafeAreaView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
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
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
