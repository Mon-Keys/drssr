import React, { ReactElement, useEffect } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Pressable,
    Platform,
    StatusBar, View
} from 'react-native';
import {RootTabScreenProps} from "../../types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import ImagePicker from "expo-image-picker";
import {Colors} from "../../styles";
import {choosePhoto} from "../../reducers/itemEditorReducer";
import {fetchUsersClothes} from "../../reducers/clothesReducer";
import ClothingCategoriesScreen from "../ClothingCategoriesScreen";
import Cheaps from "../../components/base/Cheaps";
import IconButton from "../../components/base/IconButton";
import {Entypo} from "@expo/vector-icons";
import StyledButton from "../../components/base/StyledButton";

const styles = StyleSheet.create({
    cheapContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    mainContainer: {
        flex: 10
    },
    bottomSheet: {},
    contentContainer: {
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
    selectContainer: {
        backgroundColor: Colors.base.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

function ItemsScreen() {
    return null;
}

function LooksScreen() {
    return null;
}

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
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
