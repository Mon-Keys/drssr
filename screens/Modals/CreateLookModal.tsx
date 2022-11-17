import React from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
    Pressable,
    FlatList
} from 'react-native';

import { View } from '../../components/base/Themed';

import Colors from '../../styles/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { EditableImage } from '../../components/editor/EditableImage';
import { Item } from '../../components/editor/Item';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Clothes, selectUserItems } from '../../reducers/clothesReducer';
import ViewShot from 'react-native-view-shot';
import IconButton from '../../components/base/IconButton';
import { RootStackScreenProps } from '../../types';
import { addLookPhoto } from '../../reducers/createLookReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    lookArea: {
        backgroundColor: Colors.base.white,
        height: 700,
        width: 400
    },
    bottomSheet: {
        backgroundColor: Colors.base.white
    },
    contentContainer: {
        backgroundColor: Colors.base.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    resizedImage: {
        height: 250,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'stretch',
        marginBottom: 10
    },
    defaultImage: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
        resizeMode: 'center'
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 375 / 2,
        left: 94,
        top: -100,
        height: 40,
        backgroundColor: Colors.base.black,
        borderRadius: 14
    },
    addButton: { top: 20, left: 20, width: 60, height: 60 }
});

export interface ItemMock {
    image: string;
    id: string;
}

export default function CreateLookModal({
    navigation
}: RootStackScreenProps<'CreateLook'>) {
    const [boardItems, setBoardItems] = React.useState<Array<string>>([]);
    const clothes = useAppSelector(selectUserItems);

    const dispatch = useAppDispatch();

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(() => ['80%'], []);

    const openModal = () => {
        // @ts-ignore
        bottomSheetModalRef.current.present();
    };

    const closeModal = () => {
        // @ts-ignore
        bottomSheetModalRef.current.close();
    };

    const ref = React.useRef();

    const proceed = () => {
        //@ts-ignore
        ref.current.capture().then((uri) => {
            console.log('captue done');
            console.log('captue done');
            console.log('captue done');
            dispatch(addLookPhoto(uri));
            navigation.navigate('SaveLook');
        });
    };

    // @ts-ignore
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <Pressable style={styles.addButton} onPress={openModal}>
                    <AntDesign
                        name="pluscircle"
                        size={36}
                        color={Colors.base.black}
                    />
                </Pressable>
                <ViewShot
                    onCapture={() => {}}
                    //@ts-ignore
                    ref={ref}
                    options={{ result: 'base64', format: 'jpg', quality: 0.8 }}
                >
                    <View style={styles.lookArea}>
                        {boardItems.map((item) => (
                            <EditableImage
                                style={styles.defaultImage}
                                source={{ uri: item }}
                            />
                        ))}
                    </View>
                </ViewShot>
                <View style={styles.nextButton}>
                    <IconButton
                        //@ts-ignore
                        title={'proceed'}
                        icon={
                            <AntDesign
                                name="arrowright"
                                size={36}
                                color={Colors.base.white}
                            />
                        }
                        onPress={proceed}
                        color={Colors.base.black}
                    />
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={styles.bottomSheet}
                    backgroundStyle={{ backgroundColor: Colors.base.lightgray }}
                    handleIndicatorStyle={{
                        backgroundColor: Colors.base.black
                    }}
                >
                    <View style={styles.contentContainer}>
                        <Pressable onPress={closeModal}>
                            <Entypo
                                name="cross"
                                size={24}
                                color={Colors.base.black}
                            />
                        </Pressable>
                        <FlatList
                            data={clothes}
                            renderItem={({ item }) => (
                                <Item
                                    imgURI={`http://leonidperl.in/${item.mask_path}`}
                                    callbackfn={() => {
                                        setBoardItems([
                                            ...boardItems,
                                            `http://leonidperl.in/${item.mask_path}`
                                        ]);
                                        closeModal();
                                    }}
                                />
                            )}
                            keyExtractor={(item: Clothes) => `${item.id}`}
                            numColumns={3}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
