import React from 'react';
import { StyleSheet, Pressable, FlatList } from 'react-native';

import { View } from '../../../components/base/Themed';

import Colors from '../../../styles/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { EditableImage } from '../../../components/editor/EditableImage';
import { Item } from '../../../components/editor/Item';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserItems } from '../../../reducers/items/clothesReducer';
import ViewShot from 'react-native-view-shot';
import { RootStackScreenProps } from '../../../types';
import { addLookPhoto } from '../../../reducers/createLookReducer';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import BaseButton from '../../../components/base/BaseButton';
import EmptyView from '../../../components/base/EmptyView';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.base.white
    },
    addButton: {
        position: 'absolute',
        zIndex: 10,
        top: 20,
        right: 20
    },
    lookArea: {
        height: 700,
        width: 500
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
        position: 'absolute',
        bottom: 14,
        left: '50%',
        width: 120,
        marginLeft: -60
    }
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
                {boardItems.length === 0 ? (
                    <EmptyView
                        textHeader={'Создайте образ'}
                        text={'Добавляйте вещи с помощью +'}
                    />
                ) : (
                    <>
                        <ViewShot
                            onCapture={() => {}}
                            //@ts-ignore
                            ref={ref}
                            options={{
                                result: 'base64',
                                format: 'jpg',
                                quality: 0.8
                            }}
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
                        <BaseButton
                            title={'Далее'}
                            style={styles.nextButton}
                            onPress={proceed}
                        />
                    </>
                )}
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
                            // keyExtractor={(item: Clothes) => `${item.id}`}
                            numColumns={3}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
