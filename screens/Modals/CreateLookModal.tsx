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

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.lightgray,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    lookArea: {
        backgroundColor: Colors.base.lightgray,
        height: 600,
        width: 400
    },
    bottomSheet: {
        backgroundColor: Colors.base.lightgray
    },
    contentContainer: {
        backgroundColor: Colors.base.lightgray,
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
        width: 200,
        height: 200,
        backgroundColor: 'transparent'
    },
    addButton: { top: 20, left: 20, width: 60, height: 60 }
});

// export interface Item {
//     image: string;
//     id: number;
//     coords: {
//         x: number;
//         y: number;
//     };
// }

// export interface Look {
//     LookItems: Array<Item>;
// }

export interface ItemMock {
    image: string;
    id: string;
}

export default function CreateLookModal(/*{
    navigation
}: RootStackScreenProps<'ImageRecognizer'>*/) {
    const [boardItems, setBoardItems] = React.useState<Array<string>>([]);
    const clothes = useAppSelector(selectUserItems);

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

    // @ts-ignore
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <Pressable style={styles.addButton} onPress={openModal}>
                    <AntDesign
                        name="pluscircle"
                        size={36}
                        color={Colors.base.white}
                    />
                </Pressable>
                <View style={styles.lookArea}>
                    {boardItems.map((item) => (
                        <EditableImage
                            style={styles.defaultImage}
                            source={{ uri: item }}
                        />
                    ))}
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={styles.bottomSheet}
                    backgroundStyle={{ backgroundColor: Colors.base.black }}
                    handleIndicatorStyle={{
                        backgroundColor: Colors.base.white
                    }}
                >
                    <View style={styles.contentContainer}>
                        <Pressable onPress={closeModal}>
                            <Entypo
                                name="cross"
                                size={24}
                                color={Colors.base.white}
                            />
                        </Pressable>
                        <FlatList
                            data={clothes}
                            renderItem={({ item }) => (
                                <Item
                                    imgURI={`data:image/jpg;base64,${item.mask}`}
                                    callbackfn={() => {
                                        setBoardItems([
                                            ...boardItems,
                                            `data:image/jpg;base64,${item.mask}`
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
