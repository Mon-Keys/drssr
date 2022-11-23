import React, { ReactNode } from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

import {Colors, Layout} from '../../styles';
import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {RootNavigation, TapBarNavigation} from '../../types';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export interface ViewBottomMenuProps {
    children: ReactNode;
    hasClothes: boolean;
    hasLooks: boolean;
    modalRef: React.RefObject<BottomSheetModalMethods>;
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    selectContainer: {
        flex: 1,
        backgroundColor: Colors.base.white
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
    },
    helpText: {
        fontSize: Layout.fontSize.default,
        color: Colors.base.black,
    }
});

export default function NewPostBottomMenu(props: ViewBottomMenuProps) {
    const tapBarNavigation = useNavigation<TapBarNavigation>();
    const navigation = useNavigation<RootNavigation>();

    const snapPoints = React.useMemo(() => ['25%'], []);

    const closeMenu = () => {
        if (props.modalRef.current) {
            props.modalRef.current.close();
        }
    };

    const goWardrobe = () => {
        tapBarNavigation.navigate('Wardrobe');
        closeMenu();
    };

    const newLook = () => {
        navigation.navigate('CreateLook');
        closeMenu();
    };

    const selectLook = () => {
        navigation.navigate('LooksForNewPost');
        closeMenu();
    };

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
                        <Text style={styles.headerMenu}>Создание публикации</Text>
                        <Pressable onPress={closeMenu}>
                            <Entypo
                                name="cross"
                                size={24}
                                color={Colors.base.black}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.bodyMenuContainer}>
                        {!props.hasClothes ? (
                            <>
                                <Text style={styles.helpText}>Сперва добавьте вещей в свой гардероб</Text>
                                <Pressable onPress={goWardrobe} >
                                    <Text style={styles.bodyMenuButton}>Перейти в гардероб</Text>
                                </Pressable>
                            </>
                        ) : !props.hasLooks ? (
                            <>
                                <Pressable onPress={newLook} >
                                    <Text style={styles.bodyMenuButton}>Новый образ</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable onPress={newLook} >
                                    <Text style={styles.bodyMenuButton}>Новый образ</Text>
                                </Pressable>
                                <Pressable onPress={selectLook} >
                                    <Text style={styles.bodyMenuButton}>Существующий образ</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
