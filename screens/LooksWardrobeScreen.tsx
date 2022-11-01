import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default function LooksWardrobeScreen() {
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(() => ['40%'], []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> wardrobe </Text>

        </View>
    );
}
