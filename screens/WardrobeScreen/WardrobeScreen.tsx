import React, { ReactElement } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    View
} from 'react-native';
import { Colors, Layout } from '../../styles';
import CategoriesScreen from './ItemsScreen/CategoriesScreen';
import IconButton from '../../components/base/IconButton';
import { AntDesign } from '@expo/vector-icons';
import LooksWardrobeScreen from './LooksScreen/LooksWardrobeScreen';
import ViewBottomMenu from '../../components/items/ViewBottomMenu';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CheapButtons from '../../components/base/CheapButtons';

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

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const openModal = () => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    };

    return (
        <ViewBottomMenu modalRef={bottomSheetModalRef}>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <CheapButtons
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
        </ViewBottomMenu>
    );
}
