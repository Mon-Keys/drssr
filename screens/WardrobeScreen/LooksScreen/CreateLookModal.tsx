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
import {addLookData, addLookPhoto} from '../../../reducers/createLookReducer';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import EmptyView from '../../../components/base/EmptyView';
import { getUri } from "../../../network/const";
import * as Console from "console";

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
    arrow: {
        backgroundColor: 'transparent'
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 35,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        width: '100%'
    },
    arrowBox: {
        height: 35,
        maxWidth: 170,
        minWidth: 135,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'black'
    }
});

export interface Item {
    id: number;
    image: string;
}

export default function CreateLookModal({
    navigation
}: RootStackScreenProps<'CreateLook'>) {
    const [boardItems, setBoardItems] = React.useState<Array<Item>>([]);
    const getItemsIds = (): Array<number> => {
        const ids: Array<number> = [];
        boardItems.forEach((item) => {
            ids.push(item.id);
        })
        return ids
    }

    const clothes = useAppSelector(selectUserItems);

    const dispatch = useAppDispatch();

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(() => ['80%'], []);

    const [maxZIndex, setMaxZIndex] = React.useState(0);

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
        ref.current.capture().then((lookImg) => {
            dispatch(addLookPhoto(lookImg));
            dispatch(addLookData(getItemsIds()));
            navigation.navigate('SaveLook');
        });
    };

    const addItem = (id: number, path: string) => {
        setBoardItems([...boardItems, {id: id, image: getUri(path)}]);
    };
    const removeItem = (ind: number) => {
        setBoardItems(boardItems.filter((value, index) => index !== ind));
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
                                {boardItems.map((item, index) => (
                                    <EditableImage
                                        onLongPress={() => {
                                            removeItem(index);
                                        }}
                                        maxZIndex={maxZIndex}
                                        setMaxZIndex={() => {
                                            setMaxZIndex(maxZIndex + 1);
                                        }}
                                        style={styles.defaultImage}
                                        source={{ uri: item.image }}
                                    />
                                ))}
                            </View>
                        </ViewShot>

                        <Pressable
                            onPress={proceed}
                            style={styles.arrowContainer}
                        >
                            <View style={styles.arrowBox}>
                                <AntDesign
                                    style={styles.arrow}
                                    name="arrowright"
                                    size={24}
                                    color={Colors.base.white}
                                />
                            </View>
                        </Pressable>
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
                                        addItem(item.id, item.mask_path)
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
