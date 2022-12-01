import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Platform,
    StatusBar,
    Text
} from 'react-native';

import { Colors, Layout } from '../../../styles';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserItems } from '../../../reducers/items/clothesReducer';
import { RootNavigation, ThingScreenRouteProp } from '../../../types';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../../../components/base/IconButton';
import { AntDesign } from '@expo/vector-icons';
import Item from '../../../components/items/Item';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        display: 'flex',
        backgroundColor: 'transparent'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: Layout.margins.default,
        marginBottom: Layout.margins.small
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        marginRight: 26,
        color: Colors.base.black
    }
});

export default function ItemScreen() {
    const clothing = useAppSelector(selectUserItems);
    const navigation = useNavigation<RootNavigation>();

    const route = useRoute<ThingScreenRouteProp>();
    const { id } = route.params;

    let item = clothing[0];
    const itemTemp = clothing.find((item) => item.id == id);
    if (itemTemp) {
        item = itemTemp;
    } else {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton
                    style={{ flex: 0 }}
                    icon={
                        <AntDesign
                            name="back"
                            size={24}
                            color={Colors.base.black}
                        />
                    }
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText}>{'Вещь'}</Text>
                </View>
            </View>
            <Item item={item} />
        </SafeAreaView>
    );
}
