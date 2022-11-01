import React from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
    Text,
    Pressable,
    FlatList,
    Image
} from 'react-native';

// import ImageResizer, { ResizeMode } from '@bam.tech/react-native-image-resizer';

import { View } from '../components/Themed';

import Colors from '../constants/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

import {
    BottomSheetModal,
    BottomSheetModalProvider,
    TouchableOpacity
} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    lookArea: {
        backgroundColor: Colors.base.black,
        height: 600,
        width: 400
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
    wardrobeImageBackground: {
        backgroundColor: Colors.base.darkgray,
        borderRadius: 18,
        margin: 10
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
        height: 200
    },
    menuItemSize: { height: 100, width: 100 },
    addButton: { top: 20, left: 20, width: 60, height: 60 }
});

export interface Item {
    image: string;
    id: number;
    coords: {
        x: number;
        y: number;
    };
}

export interface Look {
    LookItems: Array<Item>;
}

export interface ItemMock {
    image: string;
    id: string;
}

export default function CreateLookModal(/*{
    navigation
}: RootStackScreenProps<'ImageRecognizer'>*/) {
    // const cameraPermission = await Camera.getCameraPermissionStatus()
    // const microphonePermission = await Camera.getMicrophonePermissionStatus()
    // const [look, setLook] = React.useState<Look | null>(null);

    const [naebka, setNaebka] = React.useState<boolean>(false);

    const [itemsAvail] = React.useState<Array<ItemMock>>([
        {
            id: '1',
            image: 'https://images.squarespace-cdn.com/content/v1/51c322cfe4b032aad705a0fc/1642096058736-J6V8HNHZOH0BODMNOM2J/G185B_Black_FF.png?format=1000w'
        },
        {
            id: '2',
            image: 'https://pngimg.com/uploads/hoodie/hoodie_PNG13.png'
        }
    ]);

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

    const Item = ({ data }: { data: ItemMock }) => {
        // const [selectedMode, setMode] = React.useState<ResizeMode>('contain');
        // const [onlyScaleDown, setOnlyScaleDown] = React.useState(false);
        // const [image, setImage] = React.useState<null | string>(data.image);
        // const [sizeTarget, setSizeTarget] = React.useState(80);
        const [resizedImage] = React.useState<null | Response>();

        // const resize = async () => {
        //     if (!image || !image) return;
        //
        //     setResizedImage(null);
        //
        //     try {
        //         // let result = await ImageResizer.createResizedImage(
        //         //     image,
        //         //     sizeTarget,
        //         //     sizeTarget,
        //         //     'JPEG',
        //         //     100,
        //         //     0,
        //         //     undefined,
        //         //     false,
        //         //     {
        //         //         mode: selectedMode,
        //         //         onlyScaleDown
        //         //     }
        //         // );
        //         // setResizedImage(result);
        //         setNaebka(true);
        //     } catch (error) {
        //         // alert('Unable to resize the photo'+error);
        //     }
        // };

        return (
            <TouchableOpacity
                style={[styles.wardrobeImageBackground]}
                onLongPress={() => {
                    // closeModal()
                    // ImageResizer.createResizedImage(
                    //     path,
                    //     300,
                    //     300,
                    //     compressFormat,
                    //     quality,
                    //     rotation,
                    //     outputPath
                    // )
                }}
                onPress={() => setNaebka(true)}
                delayLongPress={300}
            >
                <Image
                    style={styles.menuItemSize}
                    source={{ uri: data.image }}
                />
                {resizedImage ? (
                    <>
                        <Image
                            style={styles.resizedImage}
                            source={{ uri: data.image }}
                            resizeMode="contain"
                        />

                        {/*<Text>Width: {resizedImage.width}</Text>*/}
                        {/*<Text>Height: {resizedImage.height}</Text>*/}
                    </>
                ) : null}
            </TouchableOpacity>
        );
    };

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
                    {naebka ? (
                        <Image
                            style={styles.defaultImage}
                            source={{
                                uri: 'https://images.squarespace-cdn.com/content/v1/51c322cfe4b032aad705a0fc/1642096058736-J6V8HNHZOH0BODMNOM2J/G185B_Black_FF.png?format=1000w'
                            }}
                        />
                    ) : null}
                    {naebka}
                </View>
                <Text> dasds </Text>
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
                            data={itemsAvail}
                            renderItem={({ item }) => <Item data={item} />}
                            keyExtractor={(item: ItemMock) => item.id}
                            numColumns={3}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
